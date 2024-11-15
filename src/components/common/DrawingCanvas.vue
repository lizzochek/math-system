<template>
    <div class="math-input">
      <h1>Math Input via Stylus or Finger</h1>
      <canvas ref="canvas" width="500" height="400" @mousedown="startDrawing($event)" @mousemove="draw($event)"
        @mouseup="stopDrawing" @mouseout="stopDrawing" @touchstart="startDrawingTouch($event)"
        @touchmove="drawTouch($event)" @touchend="stopDrawing" @touchcancel="stopDrawing"></canvas>
  
      <div id="controls">
        <label for="toolSelect">Select Tool:</label>
        <select v-model="currentTool" id="toolSelect">
          <option value="pen">Pen</option>
          <option value="line">Line</option>
          <option value="curve">Curve</option>
        </select>
        <button @click="clearCanvas">Clear Canvas</button>
        <button @click="submitDrawing">Submit Drawing</button>
      </div>
  
      <div id="result">Recognized Expression: <span>{{ recognizedExpression }}</span></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ctx: null, // Canvas drawing context
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        currentTool: "pen", // Default tool
        recognizedExpression: "", // Recognized math expression
      };
    },
    mounted() {
      // Initialize the canvas context when the component is mounted
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext("2d");
      this.ctx.lineWidth = 2;
      this.ctx.lineJoin = "round";
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = "black";
    },
    methods: {
      // Start drawing with mouse
      startDrawing(event) {
        const { x, y } = this.getMousePosition(event);
        this.isDrawing = true;
        [this.lastX, this.lastY] = [x, y];
      },
      // Draw with mouse
      draw(event) {
        if (!this.isDrawing) return;
        const { x, y } = this.getMousePosition(event);
        this.drawLine(x, y);
      },
      // Stop drawing
      stopDrawing() {
        this.isDrawing = false;
      },
      // Get mouse position relative to canvas
      getMousePosition(event) {
        const rect = this.$refs.canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
      },
      // Start drawing with touch events
      startDrawingTouch(event) {
        const touch = event.touches[0];
        const rect = this.$refs.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        this.isDrawing = true;
        [this.lastX, this.lastY] = [x, y];
      },
      // Draw with touch events
      drawTouch(event) {
        if (!this.isDrawing) return;
        const touch = event.touches[0];
        const rect = this.$refs.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        this.drawLine(x, y);
      },
      // Draw line, pen, or curve based on selected tool
      drawLine(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
  
        if (this.currentTool === "pen") {
          this.ctx.lineTo(x, y);
        } else if (this.currentTool === "line") {
          this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height); // Clear for new line
          this.ctx.lineTo(x, y);
        } else if (this.currentTool === "curve") {
          this.ctx.quadraticCurveTo(this.lastX, this.lastY, (this.lastX + x) / 2, (this.lastY + y) / 2);
        }
  
        this.ctx.stroke();
        [this.lastX, this.lastY] = [x, y];
      },
      // Clear canvas
      clearCanvas() {
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.recognizedExpression = ""; // Clear recognized expression
      },
      // Simulate submitting the drawing and recognizing the expression
      submitDrawing() {
        const dataURL = this.$refs.canvas.toDataURL();
        console.log("Canvas data URL:", dataURL); // In real case, you can send this to API
  
        // Simulated recognition result
        this.simulateRecognition();
      },
      // Simulate recognizing a math expression
      simulateRecognition() {
        this.recognizedExpression = "x^2 + y^2 = r^2"; // Example of recognized expression
      },
    },
  };
  </script>
  
  <style scoped>
  .math-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  }
  
  canvas {
    border: 1px solid white;
    touch-action: none; /* Disable default touch behavior */
  }
  
  #controls {
    margin-top: 10px;
  }
  
  button,
  select {
    margin: 5px;
  }
  
  #result {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  </style>
  