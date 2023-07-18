enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}
enum motorCH {
    //% block="M1"
    M1,
    //% block="M2"
    M2,
    //% block="M3"
    M3,
    //% block="M4"
    M4,
    //% block="M1+M3"
    M13,
    //% block="M2+M4"
    M24,
    //% block="ALL"
    M1234
}
enum motorDIR {
    //% block="Forward"
    Forward,
    //% block="Reverse"
    Reverse
}
enum motorTurn {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}
enum lineColor {
    //% block="Black"
    Black,
    //% block="White"
    White
}
enum StopMode {
    //% block="brake"
    Brake,
    //% block="coast"
    Coast
}
enum Turn {
    //% block="left"
    Left,
    //% block="right"
    Right
}
enum Transmissions {
    //% block="2WD"
    Haft,
    //% block="4WD"
    Full
}
enum Servo {

    //% block="P13"
    Servo13,
    //% block="P14"
    Servo14,
    //% block="P15"
    Servo15,
    //% block="P16"
    Servo16
}

/**
 * Custom blocks
 */
//% weight=10 color=#ff9900 weight=10 icon="\uf11b"
namespace CyBit {
    let Color_Line = 0;  //0 = black, 1 = white 
    let minValue = [1023, 1023, 1023, 1023, 1023, 1023, 1023, 1023];
    let maxValue = [0, 0, 0, 0, 0, 0, 0, 0];
    let pinsensor = [0, 0, 0, 0, 0, 0, 0, 0];
    let Num_Sensor = 0;
    let _lastPosition = 0;
    let returnValue = 0;
    let integral = 0;
    let derivative = 0;
    let previous_error = 0;
    export enum analogPort {
        A0,
        A1,
        A2,
        A3,
        A4,
        A5,
        A6,
        Knob,
        P0,
        P1,
        P2,
        P4,
        P10
    }
    export enum digitalPort {
        D1,
        D2,
        D3,
        D4,
        D5,
        D6
    }
    export enum servoPort {
        S1,
        S2,
        S3,
        S4
    }
    /**
     * read analog sensor value from A1-A4
     * @param selectpin         select analog pin to read
     * @return number           returns analog value from 0 to 1023
     */
    //% blockId=CyBit_analogRead
    //% block="analog read |%selectpin|"
    //% weight=100
    export function analogRead(selectpin: analogPort): number {
        let _buf4 = pins.createBuffer(4);
        switch (selectpin) {
            case analogPort.A0:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 0;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A1:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 1;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A2:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 2;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A3:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 4;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A4:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 5;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A5:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 6;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A6:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 7;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.Knob:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 3;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.P0:
                return pins.analogReadPin(AnalogPin.P0);
            case analogPort.P1:
                return pins.analogReadPin(AnalogPin.P1);
            case analogPort.P2:
                return pins.analogReadPin(AnalogPin.P2);
            case analogPort.P4:
                return pins.analogReadPin(AnalogPin.P4);
            case analogPort.P10:
                return pins.analogReadPin(AnalogPin.P10);

            default:
                return 0;
        }
    }

    /**
     * read Digital sensor value from D1-D6
     * @param selectpins         select digital pin to read
     * @return number           returns digital value  0 or 1
     */
    //% blockId=CyBit_digitalRead
    //% block="digital read |%selectpins|"
    //% weight=99
    export function digitalRead(selectpins: DigitalPin): number {
        led.enable(false);
        return pins.digitalReadPin(selectpins);
        
    }
    /**
     * Write a HIGH or a LOW value to a digital pin.
     * @param selectpins         select digital pin to read
     * @param Status           status HIGH to 3.3-5v and LOW 0v
     */
    //% blockId=digitalWriteStatus
    //% block="digital write %selectpins | status %Pinstatus "
    //% weight=98
    export function digitalWrite(selectpins: DigitalPin, Status: number): void {
        led.enable(false);
        pins.digitalWritePin(selectpins,Status);
        // body...
    }
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping
    //% block="Ultrasonic= trig %trig|echo %echo|unit %unit"
    //% weight=97
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }


    /**MotorON          Control motor channel direction and speed.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_MotorRun" block="motor %motorCH | direction %motorDIR | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=96
    export function MotorRun(Channel: motorCH, Direction: motorDIR, Speed: number): void {
        let _buf4 = pins.createBuffer(4);
        if (Speed < 0) { Speed = 0; }
        else if (Speed > 100) { Speed = 100; }

        if (Channel == motorCH.M1 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 0; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M1 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 1; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M2 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 2; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M2 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 3; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M3 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 4; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M3 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 5; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M4 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 6; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M4 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 7; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M13 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 8; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M13 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 9; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M24 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 10; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M24 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 11; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M1234 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 12; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorCH.M1234 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 13; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
    }


    /**MotorTurn.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_Turn" block="motor_turn direction %motorTurn | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=95
    export function Motor_turn(Direction: motorTurn, Speed: number): void {
        if (Direction == motorTurn.Left) {
            CyBit.MotorRun(1, 1, 0);
            CyBit.MotorRun(2, 1, Speed);
        }
        else if (Direction == motorTurn.Right) {
            CyBit.MotorRun(1, 1, Speed);
            CyBit.MotorRun(2, 1, 0);
        }
    }

    /**MotorSpin.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_spin" block="motor_spin direction %motorTurn | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=94
    export function Motor_spin(Direction: motorTurn, Speed: number): void {
        if (Direction == motorTurn.Left) {
            CyBit.MotorRun(1, 2, Speed);
            CyBit.MotorRun(2, 1, Speed);
        }
        else if (Direction == motorTurn.Right) {
            CyBit.MotorRun(1, 1, Speed);
            CyBit.MotorRun(2, 2, Speed);
        }
    }

    /**MotorStop.   
    * 
    */
    //% blockId="Motor_Stop" block="motor Stop %motorCH"
    //% weight=93
    export function Motor_Stop(Channel: motorCH): void {
        led.enable(false)
        if (Channel == motorCH.M1) {
            CyBit.MotorRun(1, 2, 0);
        }
        else if (Channel == motorCH.M2) {
            CyBit.MotorRun(2, 1, 0);
        }
        else if (Channel == motorCH.M3) {
            CyBit.MotorRun(3, 1, 0);
        }
        else if (Channel == motorCH.M4) {
            CyBit.MotorRun(4, 1, 0);
        }
        else if (Channel == motorCH.M13) {
            CyBit.MotorRun(1, 1, 0);
            CyBit.MotorRun(3, 1, 0);
        }
        else if (Channel == motorCH.M24) {
            CyBit.MotorRun(2, 1, 0);
            CyBit.MotorRun(4, 1, 0);
        }
        else if (Channel == motorCH.M1234) {
            CyBit.MotorRun(1, 1, 0);
            CyBit.MotorRun(2, 1, 0);
            CyBit.MotorRun(3, 1, 0);
            CyBit.MotorRun(4, 1, 0);
        }
    }
    export function Motor(_ch: number, _Speed: number): void {
        if (_ch == 1) {
            if (_Speed >= 0) { CyBit.MotorRun(motorCH.M1, motorDIR.Forward, _Speed); }
            else { CyBit.MotorRun(motorCH.M1, motorDIR.Reverse, Math.abs(_Speed)); }
        }
        else if (_ch == 2) {
            if (_Speed >= 0) { CyBit.MotorRun(motorCH.M2, motorDIR.Forward, _Speed); }
            else { CyBit.MotorRun(motorCH.M2, motorDIR.Reverse, Math.abs(_Speed)); }
        }
        else if (_ch == 3) {
            if (_Speed >= 0) { CyBit.MotorRun(motorCH.M3, motorDIR.Forward, _Speed); }
            else { CyBit.MotorRun(motorCH.M3, motorDIR.Reverse, Math.abs(_Speed)); }
        }
        else if (_ch == 4) {
            if (_Speed >= 0) { CyBit.MotorRun(motorCH.M4, motorDIR.Forward, _Speed); }
            else { CyBit.MotorRun(motorCH.M4, motorDIR.Reverse, Math.abs(_Speed)); }
        }
    }

    /**
     * Execute puase time
     * @param pausetime     mSec to delay; eg: 100
    */
    //% pausetime.min=1  pausetime.max=100000
    //% blockId=Motor_TimePAUSE block="pause | %pausetime | mS"
    //% color=#0033cc
    //% weight=92
    export function TimePAUSE(pausetime: number): void {
        basic.pause(pausetime)
    }

    /**
     * Control Servo P0 to P12 degree 0 - 180 degree 
     * @param Degree   Servo degree 0-180, eg: 90
     */

    //% blockId="NKP_ServoRun" block="Servo %Servo|degree %Degree"
    //% Degree.min=0 Degree.max=180
    //% weight=91
    export function ServoRun(selectpins: servoPort, Degree: number): void {
            
        if (selectpins == servoPort.S1) {
            pins.servoWritePin(AnalogPin.P13, Degree)
        }
        if (selectpins == servoPort.S2) {
            pins.servoWritePin(AnalogPin.P14, Degree)
        }
        if (selectpins == servoPort.S3) {
            pins.servoWritePin(AnalogPin.P15, Degree)
        }
        if (selectpins == servoPort.S4) {
            pins.servoWritePin(AnalogPin.P16, Degree)
        }

    }

    /**
     * TODO: describe your function here
     * @param e describe parameter here
     * @param SensorRead Value of Sensor; eg: 0
     */
    //% block
    //% blockId=Set_Line_Color block=" Set_Line_Color=%lineColor|Pin=%SensorRead|"
    //% weight=90
    export function Set_Line_Color(e: lineColor ,SensorRead: number[]): void {
        Num_Sensor = SensorRead.length;
        if (e == lineColor.Black) {
            Color_Line = 0;
        }
        else {
            Color_Line = 1;
        }
        for (let i = 0; i < Num_Sensor;i++ ){

        }
        // Add code here
    }
    /**
     * TODO: describe your function here
     * @param Roundforcal round for Calibrate_Sensor; eg: 200
     * @param SensorRead Value of Sensor; eg: 0
     */
    //% blockId=Calibrate_Sensor block=" Calibrate_Sensor|Round=%Roundforcal|Pin%SensorRead|"
    //% weight=89
    export function Calibrate_Sensor(Roundforcal: number, SensorRead: number[]): void {
        Num_Sensor = SensorRead.length;
        for (let i = 0; i < Roundforcal; i++) {
            for (let numSen = 0; numSen < Num_Sensor; numSen++) {
                if (SensorRead[numSen] < minValue[numSen]) {
                    minValue[numSen] = SensorRead[numSen];
                }
                else if (SensorRead[numSen] > maxValue[numSen]) {
                    maxValue[numSen] = SensorRead[numSen];
                }
            }
        }

    }

    /**
  * Set_Min_Value
  * @param min1 Value of Sensor; eg: 0
  * 
  */
    //% blockId=Set_Min_Value block="Set_Min_Value %min1|"
    //% weight=88
    export function Set_Min_Value(min1: number[]): void {
        Num_Sensor = min1.length;
        for (let NumOfSensor = 0; NumOfSensor < min1.length; NumOfSensor++) {
            minValue[NumOfSensor] = min1[NumOfSensor];
        }
        // Add code here
    }

    /**
  * Set_Max_Value
  * @param max1 Value of Sensor; eg: 0
  * 
  */
    //% blockId=Set_Max_Value block="Set_Max_Value %max1|"
    //% weight=87
    export function Set_Max_Value(max1: number[]): void {
        Num_Sensor = max1.length;
        for (let NumOfSensor2 = 0; NumOfSensor2 < max1.length; NumOfSensor2++) {
            maxValue[NumOfSensor2] = max1[NumOfSensor2];
        }
        // Add code here
    }

    /**
     * @param selectTran select Transmission for drive motor;
     * @param Kp Value of Sensor; eg: 1
     * @param Kd Value of Sensor; eg: 0
     * @param _Speed Value of Sensor; eg: 50
     */
    //% blockId=PID block=" PID Function |%selectTran|speed%_Speed|KP%kp|KD%kd|Pin%SensorRead|"
    //% weight=86
    export function PID(Transmission: Transmissions, _Speed: number, kp: number, kd: number, SensorRead: number[]): void {
        Num_Sensor = SensorRead.length;
        let setpoint = ((Num_Sensor - 1) / 2) * 100;
        let errors = setpoint - CyBit.Read_Position(SensorRead);
        integral = integral + errors;
        derivative = (errors - previous_error);
        let output = kp * errors + kd * derivative;
        let speed_motor = _Speed;
        if (output > 100) { output = 100; }
        else if (output < -100) { output = -100; }
        if (Transmission == Transmissions.Haft) {
            Motor(1, speed_motor - output);
            Motor(2, speed_motor + output);
        }
        else if (Transmission == Transmissions.Full) {
            Motor(1, speed_motor - output);
            Motor(3, speed_motor - output);
            Motor(2, speed_motor + output);
            Motor(4, speed_motor + output);
        }
        previous_error = errors;

        //return kp * errors + kd * derivative;
    }


    /**
     * TODO: Read_Position
     * @param SensorRead Value of Sensor; eg: 0
     */
    //% blockId=Read_Position block="Read_Position %SensorRead|"
    //% weight=85
    export function Read_Position(SensorRead: number[]): number {
        let ON_Line = 0;
        let avg = 0;
        let sum = 0;

        if (Color_Line == 0) {
            for (let numSen = 0; numSen < Num_Sensor; numSen++) {
                let value = Math.map(SensorRead[numSen], minValue[numSen], maxValue[numSen], 100, 0);
                if (value > 20) {
                    ON_Line = 1;
                }
                if (value > 5) {
                    avg += value * (numSen * 100);
                    sum += value;
                }
            }
        }
        else {
            for (let numSen2 = 0; numSen2 < Num_Sensor; numSen2++) {
                let value2 = Math.map(SensorRead[numSen2], minValue[numSen2], maxValue[numSen2], 0, 100);
                if (value2 > 20) {
                    ON_Line = 1;
                }
                if (value2 > 5) {
                    avg += value2 * (numSen2 * 100);
                    sum += value2;
                }
            }
        }
        if (ON_Line == 0) {
            if (_lastPosition < (Num_Sensor - 1) * 100 / 2) {
                return 0;
            }
            else {
                return (Num_Sensor - 1) * 100;
            }
        }
        _lastPosition = avg / sum;
        return (_lastPosition);
    }




    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    //% weight=84
    export function ReadMin(value: number): number {
        return minValue[value];
    }
    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    //% weight=83
    export function ReadMax(value: number): number {
        return maxValue[value];
    }
    


    
}