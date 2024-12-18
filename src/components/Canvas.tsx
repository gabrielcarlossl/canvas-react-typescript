import React, { useRef, useState } from 'react';

const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  // Lista para armazenar os retângulos criados
  const [rectangles, setRectangles] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setStartPos({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || !startPos) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Limpa o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redesenha os retângulos anteriores
    rectangles.forEach((rect) => {
      context.fillStyle = 'orange';
      context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });

    // Calcula largura e altura do retângulo atual
    const width = x - startPos.x;
    const height = y - startPos.y;

    // Desenha o retângulo atual
    context.fillStyle = 'orange';
    context.fillRect(startPos.x, startPos.y, width, height);
  };

  // Função para finalizar o retângulo
  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const width = x - startPos.x;
    const height = y - startPos.y;

    // Adiciona o novo retângulo à lista
    setRectangles((prev) => [
      ...prev,
      { x: startPos.x, y: startPos.y, width, height },
    ]);

    // Exibe o alerta
    alert('Retângulo criado!');

    setIsDrawing(false);
    setStartPos(null);
  };

  return (
    <canvas
      ref={canvasRef}
      {...props}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDrawing(false)} // Evita problemas ao sair do canvas
      width={500}
      height={500}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;
