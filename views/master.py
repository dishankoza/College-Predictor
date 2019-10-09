import time
import board
import busio
import adafruit_bme280
import FaBo9Axis_MPU9250
import sys
import math
mpu9250 = FaBo9Axis_MPU9250.MPU9250()

i2c = busio.I2C(board.SCL, board.SDA)
bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c)
bme280.sea_level_pressure = 1004.8

while True:
    print("\nTemperature: %0.1f C" % bme280.temperature)
    print("Humidity: %0.1f %%" % bme280.humidity)
    alt=bme280.altitude* 3.2808	
    print("Pressure: %0.1f hPa" % bme280.pressure)
    print("Altitude = %0.2f feet" % alt)
    accel = mpu9250.readAccel()
    print(" ax = " , ( accel['x'] ))
    print(" ay = " , ( accel['y'] ))
    print(" az = " , ( accel['z'] ))

    gyro = mpu9250.readGyro()
    print(" gx = " , ( gyro['x'] ))
    print(" gy = " , ( gyro['y'] ))
    print(" gz = " , ( gyro['z'] ))

    mag = mpu9250.readMagnet()
    print(" mx = " , ( mag['x'] ))
    print(" my = " , ( mag['y'] ))
    print(" mz = " , ( mag['z'] ))
    pitch = 180 *math. atan2(accel['x'], math.sqrt(accel['y']*accel['y'] + accel['z']*accel['z']))/math.pi
    roll = 180 * math.atan2(accel['y'], math.sqrt(accel['x']*accel['x'] + accel['z']*accel['z']))/math.pi
    mag_x = mag['x']*math.cos(pitch) + mag['y']*math.sin(roll)*math.sin(pitch) + mag['z']*math.cos(roll)*math.sin(pitch)
    mag_y = mag['y']*math.cos(roll) - mag['z'] * math.sin(roll)
    #yaw = 180*math.atan(accel['z']/math.sqrt(accel['x']*accel['x'] + accel['z']*accel['z']))/math.pi;
    yaw = 180*math.atan2(mag_y,mag_x)/math.pi;
    print("roll",roll)	
    print("pitch" , pitch)
    print("yaw",yaw)
    print()
    time.sleep(1)
