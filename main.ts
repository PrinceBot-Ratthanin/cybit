CyBit.Motor_Stop(motorCH.M1234)
led.enable(false)
OLED12864_I2C.init(60)
basic.forever(function () {
    CyBit.MotorRun(motorCH.M1234, motorDIR.Forward, 50)
    CyBit.ServoRun(CyBit.servoPort.S1, 90)
    CyBit.digitalWrite(DigitalPin.P10, 0)
    OLED12864_I2C.clear()
    OLED12864_I2C.showNumber(
    0,
    0,
    CyBit.analogRead(CyBit.analogPort.P1),
    1
    )
    OLED12864_I2C.showNumber(
    7,
    0,
    CyBit.analogRead(CyBit.analogPort.P2),
    1
    )
    CyBit.MotorRun(motorCH.M1234, motorDIR.Forward, 50)
    basic.pause(100)
    CyBit.MotorRun(motorCH.M1234, motorDIR.Reverse, 50)
    CyBit.digitalWrite(DigitalPin.P10, 1)
    CyBit.ServoRun(CyBit.servoPort.S1, 100)
    OLED12864_I2C.clear()
    OLED12864_I2C.showNumber(
    0,
    0,
    CyBit.analogRead(CyBit.analogPort.P1),
    1
    )
    OLED12864_I2C.showNumber(
    7,
    0,
    CyBit.analogRead(CyBit.analogPort.P2),
    1
    )
    basic.pause(100)
    CyBit.MotorRun(motorCH.M1234, motorDIR.Reverse, 50)
})
