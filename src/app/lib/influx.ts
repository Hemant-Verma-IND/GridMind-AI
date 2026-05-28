import { InfluxDB, Point } from "@influxdata/influxdb-client";

const url = process.env.INFLUX_URL || "http://localhost:8086";
const token = process.env.INFLUX_TOKEN || "token";
const org = process.env.INFLUX_ORG || "gridmind_org";
const bucket = process.env.INFLUX_BUCKET || "gridmind_telemetry";

const client = new InfluxDB({ url, token });

export const influxDb = {
  writeTelemetry: async (reading: { active_power_kw: number; voltage_v: number; current_a: number }) => {
    const writeApi = client.getWriteApi(org, bucket);
    
    const point = new Point("grid_telemetry")
      .tag("device_id", "gridmind_smartmeter_01")
      .floatField("active_power_kw", reading.active_power_kw)
      .floatField("voltage_v", reading.voltage_v)
      .floatField("current_a", reading.current_a);
      
    writeApi.writePoint(point);
    await writeApi.close();
    return { timestamp: new Date().toISOString(), ...reading };
  },

  getLatestTelemetry: async () => {
    const queryApi = client.getQueryApi(org);
    const fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "grid_telemetry")
        |> last()
    `;

    return new Promise((resolve, reject) => {
      const result: any = {};
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          result[o._field] = o._value;
          result.timestamp = o._time;
        },
        error(error) {
          reject(error);
        },
        complete() {
          resolve({
            active_power_kw: result.active_power_kw || 4.82,
            voltage_v: result.voltage_v || 230.4,
            current_a: result.current_a || 20.9,
            timestamp: result.timestamp || new Date().toISOString()
          });
        }
      });
    });
  },

  getTelemetryHistory: async (limit: number = 24) => {
    const queryApi = client.getQueryApi(org);
    const fluxQuery = `
      from(bucket: "${bucket}")
        |> range(start: -12h)
        |> filter(fn: (r) => r["_measurement"] == "grid_telemetry")
        |> filter(fn: (r) => r["_field"] == "active_power_kw")
        |> limit(n: ${limit})
    `;

    return new Promise<any[]>((resolve, reject) => {
      const rows: any[] = [];
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          rows.push({
            timestamp: o._time,
            active_power_kw: o._value
          });
        },
        error(error) {
          reject(error);
        },
        complete() {
          resolve(rows);
        }
      });
    });
  }
};