////////////////////////
//####################//
//##                ##//
//##  socketssr.ts  ##//
//##                ##//
//####################//
////////////////////////

let REMOTE = false

radio.onReceivedNumber(function (receivedNumber: number) {
    if (REMOTE) return // do not echo
    switch (receivedNumber) {
        case SocketSSR.Operation.On1: SocketSSR.socketOn(SocketSSR.Socket.Socket1); break;
        case SocketSSR.Operation.Off1: SocketSSR.socketOff(SocketSSR.Socket.Socket1); break;
        case SocketSSR.Operation.On2: SocketSSR.socketOn(SocketSSR.Socket.Socket2); break;
        case SocketSSR.Operation.Off2: SocketSSR.socketOff(SocketSSR.Socket.Socket2); break;
        case SocketSSR.Operation.On3: SocketSSR.socketOn(SocketSSR.Socket.Socket3); break;
        case SocketSSR.Operation.Off3: SocketSSR.socketOff(SocketSSR.Socket.Socket3); break;
        case SocketSSR.Operation.On4: SocketSSR.socketOn(SocketSSR.Socket.Socket4); break;
        case SocketSSR.Operation.Off4: SocketSSR.socketOff(SocketSSR.Socket.Socket4); break;
    }
})

//% color="#FFCC00" icon="\uf240" f5e7 e55b f1e6
//% block="Intelino"
//% block.loc.nl="Intelino"
namespace SocketSSR {

    export enum Socket {
        //% block="socket 1"
        //% block.loc.nl="contact 1"
        Socket1,
        //% block="socket 2"
        //% block.loc.nl="contact 2"
        Socket2,
        //% block="socket 3"
        //% block.loc.nl="contact 3"
        Socket3,
        //% block="socket 4"
        //% block.loc.nl="contact 4"
        Socket4,
    }

    export enum Operation {
        //% block="1 on"
        //% block.loc.nl="1 aan"
        On1,
        //% block="1 off"
        //% block.loc.nl="1 uit"
        Off1,
        //% block="2 on"
        //% block.loc.nl="2 aan"
        On2,
        //% block="2 off"
        //% block.loc.nl="2 uit"
        Off2,
        //% block="3 on"
        //% block.loc.nl="3 aan"
        On3,
        //% block="3 off"
        //% block.loc.nl="3 uit"
        Off3,
        //% block="4 on"
        //% block.loc.nl="4 aan"
        On4,
        //% block="4 off"
        //% block.loc.nl="4 uit"
        Off4,
    }

    //% block="turn remote control on"
    //% block.loc.nl="zet afstandbediening aan"
    export function setRemote() {
        REMOTE = true
    }

    //% block="turn %socket off"
    //% block.loc.nl="doe %socket uit"
    export function socketOff(socket: Socket) {
        if (REMOTE) {
            let opp: number
            switch (socket) {
                case Socket.Socket1: opp = Operation.Off1; break;
                case Socket.Socket2: opp = Operation.Off2; break;
                case Socket.Socket3: opp = Operation.Off3; break;
                case Socket.Socket4: opp = Operation.Off4; break;
            }
            radio.sendNumber(opp)
        }
        else {
            let pin: DigitalPin
            switch (socket) {
                case Socket.Socket1: pin = DigitalPin.P13; break;
                case Socket.Socket2: pin = DigitalPin.P14; break;
                case Socket.Socket3: pin = DigitalPin.P15; break;
                case Socket.Socket4: pin = DigitalPin.P16; break;
            }
            pins.digitalWritePin(pin, 0)
        }
    }

    //% block="turn %socket on"
    //% block.loc.nl="doe %socket aan"
    export function socketOn(socket: Socket) {
        if (REMOTE) {
            let opp: number
            switch (socket) {
                case Socket.Socket1: opp = Operation.On1; break;
                case Socket.Socket2: opp = Operation.On2; break;
                case Socket.Socket3: opp = Operation.On3; break;
                case Socket.Socket4: opp = Operation.On4; break;
            }
            radio.sendNumber(opp)
        }
        else {
            let pin: DigitalPin
            switch (socket) {
                case Socket.Socket1: pin = DigitalPin.P13; break;
                case Socket.Socket2: pin = DigitalPin.P14; break;
                case Socket.Socket3: pin = DigitalPin.P15; break;
                case Socket.Socket4: pin = DigitalPin.P16; break;
            }
            pins.digitalWritePin(pin, 1)
        }
    }

    //% block="turn %socket on for %time sec"
    //% block.loc.nl="doe %socket %time sec aan"
    export function socketOnOff(socket: Socket, time: number) {
        socketOn(socket)
        basic.pause(time * 1000)
        socketOff(socket)
    }
}