let hexInput = document.getElementById("hex");
let rgbInput = document.getElementById("rgb");
let lslInput = document.getElementById("lsl");
let hslInput = document.getElementById("hsl");

window.onload=()=>{
    hexInput.value = "";
    rgbInput.value = "";
    lslInput.value = "";
    hslInput.value = "";
}

function valid(element){
    element.style.color = "#202040";
}

function invalid(element,otherElement){
    element.style.color = "#f04624";
    otherElement.value = 0;
}

function HEXtoRGB(){
    let hexCode = hexInput.value;
    let rgbArr = [];
    if(/^#?[A-Fa-f0-9]{6}$/.test(hexCode)){
        valid(hexInput);
        hexCode = hexCode.split("#")[1] || hexCode;
        for(let i=0; i<hexCode.length;i+=2){
            rgbArr.push(parseInt(hexCode[i] + hexCode[i+1], 16));
            console.log(rgbArr);
        }
        rgbInput.value = "rgb(" + rgbArr + ")";
        document.body.style.backgroundColor = "rgb(" + rgbArr + ")";
    }
    else{
        invalid(hexInput,rgbInput);
    }
}

function RGBtoHEX(){
    let rgbCode = rgbInput.value;
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbRegex2 = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/
    let hex = "#";
    if(rgbRegex1.test(rgbCode) || rgbRegex2.test(rgbCode)){
        rgbCode = rgbCode.replace(/[rgb()]+/g,"") || rgbCode;
        rgbCode = rgbCode.split(",");
        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });
        if(condition){
            valid(rgbInput);
            rgbCode.forEach(value => {
                value = parseInt(value).toString(16);
                hex += value.length == 1? "0"+value : value;
            });
            hexInput.value = hex;
            document.body.style.backgroundColor = hex;
        }
        else{
            invalid(rgbInput,hexInput);
        }
    }
    else{
        invalid(rgbInput,hexInput);
    }
}

function RGBtoLSL(){
    let rgbCode = rgbInput.value;
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbRegex2 = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/
    let lslArr=[];
    if(rgbRegex1.test(rgbCode) || rgbRegex2.test(rgbCode)){
        rgbCode = rgbCode.replace(/[rgb()]+/g,"") || rgbCode;
        rgbCode = rgbCode.split(",");
        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });
        if(condition){
            valid(rgbInput);
            rgbCode.forEach(value => {
                lslArr.push((parseInt(value)/255).toFixed(3));
                console.log(lslArr);
            });
            lslInput.value = "lsl(" + lslArr + ")";
        }
        else {
            invalid(lslInput,rgbInput)
        }
    }
}

function RGBtoHSL(){
    let rgbCode = rgbInput.value;
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbRegex2 = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/
    let hslArr=[];
    if(rgbRegex1.test(rgbCode) || rgbRegex2.test(rgbCode)){
        rgbCode = rgbCode.replace(/[rgb()]+/g,"") || rgbCode;
        rgbCode = rgbCode.split(",");
        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });
        if(condition){
            valid(rgbInput);
            const max = Math.max(...rgbCode);
            const min = Math.min(...rgbCode);
            const lum = (max + min) / 2;
            if (max === min) {
                hue = 0;
                sat = 0;
            } else {
                const d = max - min;
                const sat = lum > 0.5 ? d / (2 - max - min) : d / (max + min);
                r = rgbCode.at(0);
                g = rgbCode.at(1);
                b = rgbCode.at(2);
                let hue;
                switch (max) {
                    case r:
                        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                        break;
                    case g:
                        hue = ((b - r) / d + 2) / 6;
                        break;
                    case b:
                        hue = ((r - g) / d + 4) / 6;
                        break;
                    default:
                        hue = 0;
                        break;
                }
                hslArr[0] = hue;
                hslArr[1] = sat;
                hslArr[2] = lum;
            }
            hslInput.value = `hsl(${Math.round(hslArr[0] * 360)}, ${Math.round(hslArr[1] * 100)}%, ${Math.round(hslArr[2] * 100)}%)`;
//            hslInput.value = "hsl(" + hslArr + ")";
            console.log(hslArr);
        }
    }
}

// Example usage:
const rgbColor = { r: 255, g: 0, b: 0 }; // Red color
const hslColor = RGBtoHSL(rgbColor.r, rgbColor.g, rgbColor.b);
const lslColor = RGBtoLSL(rgbColor.r, rgbColor.g, rgbColor.b);
console.log(hslColor);

function fromRgb(){
    RGBtoHEX();
    RGBtoLSL();
    RGBtoHSL();
}

function fromHex(){
    HEXtoRGB();
    RGBtoLSL();
    RGBtoHSL();
}

function fromLsl(){
    LSLtoRGB();
    RGBtoHEX();
    RGBtoHSL();
}

function fromHsl(){
    HSLtoRGB();
    RGBtoHEX();
    RGBtoLSL();
}