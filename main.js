
window.onload = function(event) {
    console.log("All loaded properly");

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // let gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
    let gradient = ctx.createConicGradient(0,canvas.width/2, canvas.height/2);
    // let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 150, canvas.width/2, canvas.height/2, 400);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'yellow');
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.6, 'cyan');
    gradient.addColorStop(0.8, 'blue');
    gradient.addColorStop(1, '#AF1740');
    
    class Symbol {
    //handle individual symbols
        constructor(x, y, fontSize, canvasHeight){
            // all the symbols in the matrix rains
            this.chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンऐ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙♚♛♜♝♞♟ↀↁↂↇↈ☭﷼ᚠᚡᚢᚣᚤᚥᚦᚧᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛭ᛮᛯ"
            this.x = x;
            this.y = y;
            this.fontSize = fontSize;
            this.canvasHeight = canvasHeight;
            this.text = ""; // holds one chars from defined array(this.chars) to draw on
        }

        draw(ctx){
            this.text = this.chars.at(Math.floor(Math.random() * this.chars.length));
            ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
            if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95){
                // reset back to top of canvas
                this.y = 0;
            } else {
                this.y += 1;
            }
        }
    }


    class Effect {
    // handle the whole rain effect
        constructor(canvasWidth, canvasHeight){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.fontSize = 18;
            this.columns = this.canvasWidth / this.fontSize; // num of columns
            this.symbols = [];
            this.#initialize();
            //console.log(this.symbols);
        }

        #initialize(){
            for(let i =0; i < this.columns; i++){
                this.symbols[i] = new Symbol(i, this.canvasHeight / Math.random(), this.fontSize, this.canvasHeight);
            }
        }

        resize(width, height){
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.columns = this.canvasWidth / this.fontSize; 
            this.symbols = [];
            this.#initialize();
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    let lastTime = 0;
    const fps = 30;
    const nextFrame = 1000/fps;
    let timer = 0;

    function animate(timestamp){
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        if (timer > nextFrame){
            ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = gradient //"#0aff0a";
            ctx.font = `${effect.fontSize}px monospace`; 
            ctx.textAlign = "center";
            effect.symbols.forEach(symbols => symbols.draw(ctx));
            timer = 0;
        } else {
            timer += deltaTime;
        }

        requestAnimationFrame(animate);
    }

    animate(0);

    window.addEventListener('resize', () =>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        effect.resize(canvas.width, canvas.height);
        gradient = ctx.createConicGradient(0,canvas.width/2, canvas.height/2);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.2, 'yellow');
        gradient.addColorStop(0.4, 'green');
        gradient.addColorStop(0.6, 'cyan');
        gradient.addColorStop(0.8, 'blue');
        gradient.addColorStop(1, '#AF1740');
    });
};