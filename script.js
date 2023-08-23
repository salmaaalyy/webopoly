const board = [String][String];

class Board {
    
}






function startGame(){
    const canvas = document.getElementById("board");    
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, 1000, 1000);
        // first row
        ctx.fillStyle = "red";        
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = "orange";        
        ctx.fillRect(100, 0, 100, 100);
        ctx.fillStyle = "yellow";        
        ctx.fillRect(200, 0, 100, 100);
        ctx.fillStyle = "green";        
        ctx.fillRect(300, 0, 100, 100);
        ctx.fillStyle = "blue";        
        ctx.fillRect(400, 0, 100, 100);
        // second row
        ctx.fillStyle = "orange";        
        ctx.fillRect(0, 100, 100, 100);
        ctx.fillStyle = "yellow";        
        ctx.fillRect(100, 100, 100, 100);
        ctx.fillStyle = "green";        
        ctx.fillRect(200, 100, 100, 100);
        ctx.fillStyle = "blue";        
        ctx.fillRect(300, 100, 100, 100);
        ctx.fillStyle = "purple";        
        ctx.fillRect(400, 100, 100, 100);
        // second row
        ctx.fillStyle = "yellow";        
        ctx.fillRect(0, 200, 100, 100);
        ctx.fillStyle = "green";        
        ctx.fillRect(100, 200, 100, 100);
        ctx.fillStyle = "blue";        
        ctx.fillRect(200, 200, 100, 100);
        ctx.fillStyle = "purple";        
        ctx.fillRect(300, 200, 100, 100);
        ctx.fillStyle = "red";        
        ctx.fillRect(400, 200, 100, 100);
        console.log("board filled");
        
        // ctx.font = "20px Times New Roman";
        // ctx.fillStyle = "Black";
        // ctx.fillText("welcome to webopoly!", 100, 100);
    } else {
      // canvas-unsupported code here
      console.log("canvas not supported");
    }
}