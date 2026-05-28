"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, Play, RotateCcw, Home, ShieldAlert } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  type: "clean" | "fault";
}

export default function NotFound() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [lives, setLives] = useState(3);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playerXRef = useRef(175);
  const gameStateRef = useRef(gameState);
  
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("gridmind_404_highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let spawnTimer = 0;
    
    playerXRef.current = canvas.width / 2 - 25;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        playerXRef.current = Math.max(0, playerXRef.current - 20);
      } else if (e.key === "ArrowRight") {
        playerXRef.current = Math.min(canvas.width - 50, playerXRef.current + 20);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      playerXRef.current = Math.max(0, Math.min(canvas.width - 50, relativeX - 25));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.touches[0].clientX - rect.left;
      playerXRef.current = Math.max(0, Math.min(canvas.width - 50, relativeX - 25));
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#1E2522";
      ctx.fillRect(playerXRef.current, canvas.height - 20, 50, 10);
      
      ctx.fillStyle = "#119785";
      ctx.fillRect(playerXRef.current + 20, canvas.height - 25, 10, 5);

      spawnTimer++;
      if (spawnTimer % 35 === 0) {
        particles.push({
          x: Math.random() * (canvas.width - 15),
          y: -10,
          speed: 2.5 + Math.random() * 2,
          size: 8 + Math.random() * 6,
          type: Math.random() > 0.3 ? "clean" : "fault",
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speed;

        if (p.type === "clean") {
          ctx.fillStyle = "#119785";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#EA580C";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.size / 2);
          ctx.lineTo(p.x + p.size / 2, p.y + p.size / 2);
          ctx.lineTo(p.x - p.size / 2, p.y + p.size / 2);
          ctx.closePath();
          ctx.fill();
        }

        const collided = 
          p.y + p.size / 2 >= canvas.height - 20 &&
          p.x >= playerXRef.current - p.size / 2 &&
          p.x <= playerXRef.current + 50 + p.size / 2;

        if (collided) {
          if (p.type === "clean") {
            setScore((prev) => {
              const newScore = prev + 10;
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem("gridmind_404_highscore", newScore.toString());
              }
              return newScore;
            });
          } else {
            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameState("gameover");
              }
              return newLives;
            });
          }
          particles.splice(i, 1);
        } else if (p.y > canvas.height) {
          if (p.type === "clean") {
            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameState("gameover");
              }
              return newLives;
            });
          }
          particles.splice(i, 1);
        }
      }

      if (gameStateRef.current === "playing") {
        animationId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState("playing");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E2522] flex flex-col justify-between font-sans">
      
      <header className="border-b border-stone-200 bg-white px-6 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-stone-50 p-1.5 flex items-center justify-center border border-stone-200">
              <img 
                src="/logo.png" 
                alt="GridMind AI" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-stone-900">
              GridMind AI
            </span>
          </Link>
          <span className="text-xs font-semibold text-stone-400">Node Status: Disconnected</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div className="space-y-6 text-left">
          <span className="text-6xl font-black text-[#0266A4] tracking-tight leading-none block">404</span>
          <h1 className="text-3xl font-extrabold text-stone-900 leading-tight">Page Out of Scope</h1>
          <p className="text-sm text-stone-500 leading-relaxed max-w-md">
            The page you are looking for has been disconnected from our smart routing infrastructure. While our system re-establishes the connection node, help us stabilize the local power grid!
          </p>
          <div className="flex gap-3">
            <Link 
              href="/"
              className="px-5 py-2.5 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Home className="h-4 w-4" /> Return Home
            </Link>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-between space-y-4 w-full max-w-sm mx-auto relative overflow-hidden">
          
          <div className="w-full flex justify-between items-center border-b border-stone-100 pb-3 text-xs font-bold text-stone-600">
            <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-[#119785]" /> Score: {score}</span>
            <span>High Score: {highScore}</span>
            <span className="text-orange-600">Grid Health: {lives}</span>
          </div>

          <div className="relative w-full aspect-[4/3] bg-stone-50 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center">
            {gameState === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 z-10 bg-white/95">
                <div className="w-12 h-12 bg-[#119785]/10 text-[#119785] rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 fill-[#119785]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">Power Grid Stabilizer</h3>
                  <p className="text-[11px] text-stone-400 mt-1 max-w-[200px]">
                    Catch green power gems, avoid orange overloads. Use Left/Right keys or mouse sliding.
                  </p>
                </div>
                <button 
                  onClick={startGame}
                  className="px-4 py-2 bg-[#119785] hover:bg-[#0D7F6F] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" /> Start Stabilization
                </button>
              </div>
            )}

            {gameState === "gameover" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 z-10 bg-white/95">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-100">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">Grid Collapse</h3>
                  <p className="text-[11px] text-stone-400 mt-1">
                    System collapsed at {score} Watts. Keep trying to secure the safety limit!
                  </p>
                </div>
                <button 
                  onClick={startGame}
                  className="px-4 py-2 bg-[#0266A4] hover:bg-[#014D7C] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Re-Stabilize Grid
                </button>
              </div>
            )}

            <canvas ref={canvasRef} width={320} height={240} className="block w-full h-full" />
          </div>

          <div className="w-full text-center text-[10px] text-stone-400 pt-1">
            <p>Interactive diagnostics module. Controls: Slide Mouse or Touch.</p>
          </div>

        </div>

      </div>

      <footer className="border-t border-stone-200 py-6 text-center text-[10px] text-stone-400 bg-white">
        <p>© {new Date().getFullYear()} GridMind AI x PRIME Ecosystem. Secured and simulated.</p>
      </footer>

    </div>
  );
}