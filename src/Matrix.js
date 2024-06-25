import React, {useEffect, useRef, useState, Component} from "react";


const Canvas = () => {
    
    const hiragana_start = 0x3040, hiragana_end = 0x309F;
    const katakana_start = 0x30A0, katakana_end = 0x30FF;
    const kanji_start = 0x4E00, kanji_end = 0x9FFF;
    const ascii_start = 0x0030, ascii_end = 0x0039;
    
    const range_tuples = [ 
        [hiragana_start, hiragana_end],
        [kanji_start, kanji_end],
        [katakana_start, katakana_end],
        [ascii_start, ascii_end]
    ]

    class Node {
        
        constructor(x, y, head=true, char=null)
        {

            this.x = x;
            this.y = y;
            this.bar = 1;
            this.char = char ?? this.get_random_char()
            this.velocity = this.get_random_velocity()
            this.previous_chars = []
            this.head = head
            this.alpha = 1.0
            this.colour = (head) ? 'rgba(220, 53, 69, 1)' : 'rgba(220, 53, 69, 1)'
            this.trail_length = (this.head) ? 10 + Math.random() * 15 : 0
            this.alpha_reduction = this.get_alpha_reduction()
        }

        get_alpha_reduction() {
            return 0.007 + Math.random() * 0.005
        }

        reduce_alpha(amount) {
            this.alpha -= amount
            this.colour = 'rgba(220, 53, 69, ' + this.alpha + ')'
        }

        get_random_velocity()
        {
            return 0.03 + Math.random() * 0.05;
        }

        get_random_char()
        {
            let random_range = Math.floor(Math.random() * 4);
            random_range = range_tuples[random_range]

            let random_char = Math.floor(Math.random() * (random_range[1] - random_range[0] + 1) + random_range[0]);
            
            return String.fromCharCode(random_char);
        }
        
        move()
        {

            this.y += this.velocity
            
            if (this.y >= this.bar) {
                this.bar+=1.2;

                this.previous_chars.push(new Node(this.x, this.y, false, this.char))

                this.char = this.get_random_char();
            }
            this.previous_chars.forEach((node) => {
                node.reduce_alpha(this.alpha_reduction);
            })

            if (this.y >= 36)
            {
                this.previous_chars = []
                this.trail_length = (this.head) ? 10 + Math.random() * 15 : 0
                this.alpha_reduction = this.get_alpha_reduction()
                this.y = 0;
                this.bar = 1.0
                this.velocity = this.get_random_velocity()
            }
        }

    };

    const background_colour = 'black';
    const foreground_colour = 'rgba(220, 53, 69, 1)';
    const canvas_reference = useRef(null);
    let matrix_char_count = 30
    
    const [canvas_dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    if (window.innerWidth <= 600)
        matrix_char_count = 15;
    else
        matrix_char_count = 30;

    let matrix_nodes = (function() {
        
        let arr = [];
    
        for (let x = 0; x < matrix_char_count; x+=2) {
            arr.push(new Node(x, -Math.random() * 10));
        }
    
        return arr;
    })();

    let x_scaler = canvas_dimensions.width / matrix_char_count;
    let y_scaler = canvas_dimensions.height / matrix_char_count;


    useEffect(() => {
        const canvas = canvas_reference.current;
        const ctx = canvas.getContext('2d');

        const fix_canvas = () => {

            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
            
            if (window.innerWidth <= 600)
                matrix_char_count = 15;
            else
                matrix_char_count = 30;

            x_scaler = canvas_dimensions.width / matrix_char_count;
            y_scaler = canvas_dimensions.height / matrix_char_count;

            draw_matrix(ctx);
        }  

        document.addEventListener('DOMContentLoaded', fix_canvas);
        window.addEventListener('load', fix_canvas);
        window.addEventListener('resize', fix_canvas);

        return () => {

            window.removeEventListener('resize', fix_canvas);
            window.removeEventListener('load', fix_canvas);
            document.removeEventListener('DOMContentLoaded', fix_canvas);

        };
        
    }, []);


    useEffect(() => {
        const canvas = canvas_reference.current;
        const ctx = canvas.getContext('2d');

        canvas_dimensions.width = canvas.width;
        canvas_dimensions.height = canvas.height;
        
        draw_matrix(ctx);
    
    }, [canvas_dimensions]);


    const draw_matrix = (ctx, frames=0) => {

        ctx.clearRect(0, 0, canvas_dimensions.width, canvas_dimensions.height);

        ctx.fillStyle = background_colour;

        ctx.fillRect(0,0, canvas_dimensions.width, canvas_dimensions.height);

        ctx.fillStyle = foreground_colour;
    
        matrix_nodes.forEach((node) => {
            node.move();
            ctx.fillStyle = node.colour
            ctx.fillText(node.char, node.x * x_scaler, node.y * y_scaler)

            node.previous_chars.forEach((trail_node) => {
                
                ctx.fillStyle = trail_node.colour
                

                ctx.fillText(trail_node.char, trail_node.x * x_scaler, trail_node.y * y_scaler)

            })
        });

    }

    useEffect(() => {

        let frames = 0;
        let frame_id = 0;
        const canvas = canvas_reference.current;
        
        const ctx = canvas.getContext('2d');
        
        ctx.font = matrix_char_count + "px 'DotGothic16', sans-serif";

        const render_matrix = () => {

            draw_matrix(ctx);
            setTimeout(() => {
                frame_id = window.requestAnimationFrame(render_matrix);

            }, 0.0001);
        }
        
        render_matrix();

    }); 

    return (
        <canvas ref={canvas_reference} 
            width={canvas_dimensions.width} 
            height={canvas_dimensions.height} 
            style={{position: 'fixed',  zIndex: -2,}}
            />
    );

};

export default Canvas;