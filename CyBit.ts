enum motorSEL {
    //% block="A"
    M1,
    //% block="B"
    M2,
    //% block="AB"
    M12
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
    let minValue = [0, 0, 0, 0, 0, 0, 0, 0];
    let maxValue = [0, 0, 0, 0, 0, 0, 0, 0];
    let Num_Sensor = 0;
    let _lastPosition = 0;
    let returnValue = 0;
    let integral = 0;
    let derivative = 0;
    let previous_error = 0;
    export enum analogPort {
        A1,
        A2,
        A3,
        A4
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
            case analogPort.A1:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 29;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A2:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 28;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A3:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 27;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case analogPort.A4:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 26;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);

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
    export function digitalRead(selectpins: digitalPort): number {
        let _buf4 = pins.createBuffer(4);
        switch (selectpins) {
            case digitalPort.D1:
                _buf4[0] = 0xFF; _buf4[1] = 8; _buf4[2] = 29;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case digitalPort.D2:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 28;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case digitalPort.D3:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 27;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case digitalPort.D4:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 26;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case digitalPort.D5:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 25;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
            case digitalPort.D6:
                _buf4[0] = 0xFF; _buf4[1] = 9; _buf4[2] = 24;
                pins.i2cWriteBuffer(32, _buf4);
                return pins.i2cReadNumber(32, NumberFormat.UInt16LE, false);
        }
    }
    /**
     * Write a HIGH or a LOW value to a digital pin.
     * @param selectpins         select digital pin to read
     * @param Status           status HIGH to 3.3-5v and LOW 0v
     */
    //% blockId=digitalWriteStatus
    //% block="digital write %selectpins | status %Pinstatus "
    //% weight=98
    export function digitalWrite(selectpins: digitalPort, Status: number): void {
        let _buf4 = pins.createBuffer(4);
        switch (selectpins) {
            case digitalPort.D1:
                _buf4[0] = 0xFF; _buf4[1] = 7; _buf4[2] = 29; _buf4[3] = Status;
                pins.i2cWriteBuffer(32, _buf4);
            case digitalPort.D2:
                _buf4[0] = 0xFF; _buf4[1] = 7; _buf4[2] = 28; _buf4[3] = Status;
                pins.i2cWriteBuffer(32, _buf4);
            case digitalPort.D3:
                _buf4[0] = 0xFF; _buf4[1] = 7; _buf4[2] = 27; _buf4[3] = Status;
                pins.i2cWriteBuffer(32, _buf4);
            case digitalPort.D4:
                _buf4[0] = 0xFF; _buf4[1] = 7; _buf4[2] = 26; _buf4[3] = Status;
                pins.i2cWriteBuffer(32, _buf4);
            case digitalPort.D5:
                _buf4[0] = 0xFF; _buf4[1] = 7; _buf4[2] = 25; _buf4[3] = Status;
                pins.i2cWriteBuffer(32, _buf4);
            case digitalPort.D6:
                _buf4[0] = 0xFF; _buf4[1] = 7; _buf4[2] = 24; _buf4[3] = Status;
                pins.i2cWriteBuffer(32, _buf4);

        }
        // body...
    }


    /**MotorON          Control motor channel direction and speed.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_MotorRun" block="motor %motorSEL | direction %motorDIR | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=97
    export function MotorRun(Channel: motorSEL, Direction: motorDIR, Speed: number): void {
        let _buf4 = pins.createBuffer(4);
        if (Speed < 0) { Speed = 0; }
        else if (Speed > 100) { Speed = 100; }

        if (Channel == motorSEL.M1 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 6; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorSEL.M1 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 8; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 7; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 9; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Forward) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 0; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Reverse) {
            _buf4[0] = 0xFF; _buf4[1] = 20; _buf4[2] = 1; _buf4[3] = Speed;
            pins.i2cWriteBuffer(32, _buf4);
        }
    }


    /**MotorTurn.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_Turn" block="motor_turn direction %motorTurn | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=96
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
    //% weight=95
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
    //% blockId="Motor_Stop" block="motor Stop %motorSEL"
    //% weight=96
    export function Motor_Stop(Channel: motorSEL): void {
        led.enable(false)
        if (Channel == motorSEL.M1) {
            CyBit.MotorRun(1, 2, 0);

        }
        else if (Channel == motorSEL.M2) {
            CyBit.MotorRun(2, 1, 0);
        }
        else if (Channel == motorSEL.M12) {
            CyBit.MotorRun(1, 1, 0);
            CyBit.MotorRun(2, 1, 0);
        }
    }
    export function Motor(_ch: number, _Speed: number): void {
        if (_ch == 1) {
            if (_Speed >= 0) { CyBit.MotorRun(motorSEL.M1, motorDIR.Forward, _Speed); }
            else { CyBit.MotorRun(motorSEL.M1, motorDIR.Reverse, Math.abs(_Speed)); }
        }
        else if (_ch == 2) {
            if (_Speed >= 0) { CyBit.MotorRun(motorSEL.M2, motorDIR.Forward, _Speed); }
            else { CyBit.MotorRun(motorSEL.M2, motorDIR.Reverse, Math.abs(_Speed)); }
        }
    }

    /**
     * Execute puase time
     * @param pausetime     mSec to delay; eg: 100
    */
    //% pausetime.min=1  pausetime.max=100000
    //% blockId=Motor_TimePAUSE block="pause | %pausetime | mS"
    //% color=#0033cc
    //% weight=94
    export function TimePAUSE(pausetime: number): void {
        basic.pause(pausetime)
    }

    /**
     * Control Servo P0 to P12 degree 0 - 180 degree 
     * @param Degree   Servo degree 0-180, eg: 90
     */

    //% blockId="NKP_ServoRun" block="Servo %Servo|degree %Degree"
    //% Degree.min=0 Degree.max=180
    //% weight=93
    export function ServoRun(selectpins: servoPort, Degree: number): void {
        let _buf4 = pins.createBuffer(4);
        if (selectpins == servoPort.S1) {
            _buf4[0] = 0xFF; _buf4[1] = 70; _buf4[2] = Degree;
            pins.i2cWriteBuffer(32, _buf4);
            // pins.servoWritePin(AnalogPin.P13, Degree)
        }
        if (selectpins == servoPort.S2) {
            _buf4[0] = 0xFF; _buf4[1] = 71; _buf4[2] = Degree;
            pins.i2cWriteBuffer(32, _buf4);
        }
        if (selectpins == servoPort.S3) {
            _buf4[0] = 0xFF; _buf4[1] = 72; _buf4[2] = Degree;
            pins.i2cWriteBuffer(32, _buf4);
        }
        if (selectpins == servoPort.S4) {
            _buf4[0] = 0xFF; _buf4[1] = 73; _buf4[2] = Degree;
            pins.i2cWriteBuffer(32, _buf4);
        }

    }

    /**
     * TODO: describe your function here
     * @param e describe parameter here
     */
    //% block
    //% weight=92
    export function Set_Line_Color(e: lineColor): void {
        if (e == lineColor.Black) {
            Color_Line = 0;
        }
        else {
            Color_Line = 1;
        }
        // Add code here
    }

    /**
  * Set_Min_Value
  * @param min1 Value of Sensor; eg: 0
  * 
  */
    //% blockId=Set_Min_Value block="Set_Min_Value %min1|"
    //% weight=80
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
    //% weight=80
    export function Set_Max_Value(max1: number[]): void {
        Num_Sensor = max1.length;
        for (let NumOfSensor2 = 0; NumOfSensor2 < max1.length; NumOfSensor2++) {
            maxValue[NumOfSensor2] = max1[NumOfSensor2];
        }
        // Add code here
    }



    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    export function ReadMin(value: number): number {
        return minValue[value];
    }
    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    export function ReadMax(value: number): number {
        return maxValue[value];
    }


    /**
     * TODO: Read_Position
     * @param SensorRead Value of Sensor; eg: 0
     */
    //% blockId=Read_Position block="Read_Position %SensorRead|"
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
                if (value2 > 200) {
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
     * @param Kp Value of Sensor; eg: 1
     * @param Kd Value of Sensor; eg: 0
     * @param _Speed Value of Sensor; eg: 50
     */
    //% blockId=PID block=" PID Function speed%_Speed|KP%kp|KD%kd|Pin%SensorRead|"
    export function PID(_Speed: number, kp: number, kd: number, SensorRead: number[]): void {
        Num_Sensor = SensorRead.length;
        let setpoint = ((Num_Sensor - 1) / 2) * 100;
        let errors = setpoint - CyBit.Read_Position(SensorRead);
        integral = integral + errors;
        derivative = (errors - previous_error);
        let output = kp * errors + kd * derivative;
        let speed_motor = _Speed;
        if (output > 100) { output = 100; }
        else if (output < -100) { output = -100; }
        Motor(1, speed_motor - output);
        Motor(2, speed_motor + output);
        previous_error = errors;

        //return kp * errors + kd * derivative;
    }
}