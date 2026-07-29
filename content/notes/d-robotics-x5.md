---
date: 2026-07-29
tags: ['companies', "oc",]
---

## D-Robotics Background

D-Robotics is useful as a comparison because it puts a neural-network accelerator and a Linux-class robot computer on the same SoC. Its X5 platform is a compact, lower-power edge computer for robot perception and application logic.

D-Robotics grew out of Horizon Robotics' robotics business. Its public stack includes SoCs, RDK development kits, model-conversion tools, ROS 2 packages and cloud-side data tooling. The X5 is the main reference here. The newer S100 family is relevant only as an indication that the company has also moved toward more integrated embodied-robot compute.

## X5: an AI SoC inside a small Linux computer

The AI component in Sunrise 5, also called X5, is D-Robotics' BPU, or Brain Processing Unit. The BPU is analogous to an NPU or an inference-oriented part of a GPU. It runs compiled and quantized neural-network models. It is separate from the CPU that runs Ubuntu and ROS 2, and from the MCU normally used for hard real-time motor work.

The BPU is built into the X5 SoC. It is not a separate accelerator card. The RDK X5 board combines that SoC with DRAM, storage and robot I/O, so it is closer to a compact Linux computer with an NPU than to a bare MCU board.

| X5 SoC component | Primary role |
| --- | --- |
| 8-core Arm Cortex-A55 CPU | Ubuntu, ROS 2 nodes, application code, networking and system management |
| BPU | Neural-network inference for vision and other edge-AI workloads |
| GPU and HiFi5 DSP | Graphics, display and signal-processing work |
| ISP | Camera image processing before inference |

This split matters in a robot. The X5 can acquire camera data, run a detection or segmentation model on the BPU, and use Linux software to decide what command should be sent to a controller. It is not a replacement for the power electronics in a servo drive.

## Compute figure and model deployment

X5 is advertised as a 10 TOPS INT8 platform. TOPS means tera operations per second. It is not FLOPS, and it is usually quoted for low-precision inference rather than floating-point scientific computing. It is a rough indication of capacity, not a direct prediction of model frame rate. Operator coverage, memory bandwidth, quantization, preprocessing and the compiler all affect a deployed model.

A 2024 launch report quoted D-Robotics' claim of about 3 W for the X5 chip at its intended operating point. That figure should not be read as the power use of an entire robot or even necessarily of the RDK X5 board.

The BPU uses an NPU-style software path: a model is exported, adapted and quantized, then compiled with D-Robotics' tools for deployment. Public X5 material names Transformer, RWKV, occupancy and stereo-perception workloads alongside conventional vision models. This is not a general CUDA-like environment where every PyTorch model runs unchanged.

## Sensors, robot interfaces and the control boundary

RDK X5 exposes the interfaces of a robot edge computer rather than those of a stand-alone accelerator:

- two 4-lane MIPI CSI camera inputs and an ISP;
- HDMI and MIPI DSI display outputs;
- Gigabit Ethernet with PoE, CAN FD, USB 3.0 and a 40-pin GPIO header;
- configurable UART, PWM, I2C, SPI and I2S pins.

This lets an X5-based system ingest camera streams locally and send perception results or commands to the rest of the robot. CAN FD, Ethernet and UART are the normal routes to a mobile-base controller, a joint controller or a servo-drive network. GPIO or hardware PWM can produce logic-level control signals, but they do not drive a motor directly.

A typical division of labour is:

```text
Camera / other sensors -> X5 ISP + BPU -> Linux / ROS 2 application
                                         -> CAN FD, Ethernet, UART or GPIO/PWM
                                         -> external MCU or servo drive
                                         -> encoder feedback, FOC and motor power stage
```

The external controller or servo drive normally owns the current loop, encoder sampling, protection and high-rate position or velocity loops. X5 provides the higher-level perception, navigation, task logic and motion targets. This boundary is important when comparing it with a Hitachi sensor-side chip: neither device needs to replace the motor drive to contribute useful robot intelligence.

## Advertised X5 uses and current public position

At its September 2024 launch, D-Robotics named robot vacuums, lawn mowers, robot arms, home companion robots, quadrupeds, industrial cameras and video-conferencing devices as X5 target markets. The common thread is local visual or multimodal inference under a constrained power and cost budget.

For the Hitachi proposal, the most relevant lesson is that X5 is sold as the central edge computer that combines sensor ingestion, neural-network inference and Linux application code. A Hitachi module does not have to compete with that role. It could provide always-on local analysis of contact, sound, vibration or a small inspection camera, then send an event, feature vector or confidence score to the X5, Jetson or other main controller.

## Brief context: S100 and S100P

D-Robotics' later S100 products extend the same SoC idea for embodied robots. S100 is specified at 80 TOPS INT8 and S100P at 128 TOPS INT8. They add a 4-core Cortex-R52+ MCU beside the CPU, GPU and BPU Nash. D-Robotics describes this as a split between a "large brain" for perception and planning and a "cerebellum" for real-time communication and motion-command interpolation.

The public S100 MCU SDK includes FreeRTOS, PWM, timers, Linux-to-MCU IPC and EtherCAT. The downstream servo drive still normally owns the power stage and the inner motor-control loops. At the June 2025 S100 release, D-Robotics said it had more than 20 embodied-AI partners and more than 50 customers evaluating the board. Those are company statements, not independently audited shipment figures. It listed quadrupeds, small bipeds, semi-humanoids, humanoids, LeRobot arms, BEV detection and multi-camera video detection as target or evaluation cases.

## Sources

- [RDK X5 product page](https://developer.d-robotics.cc/en/rdkx5)
- [RDK S100 product page and specifications](https://developer.d-robotics.cc/en/rdks100)
- [D-Robotics 2024 developer-day coverage, including X5 positioning and the 3 W claim](https://www.eet-china.com/news/202409244438.html)
- [Science and Technology Daily coverage of the S100 release and company-reported partner and evaluation figures](https://www.stdaily.com/web/gdxw/2025-06/11/content_353295.html)
- [S100 MCU EtherCAT documentation](https://developer.d-robotics.cc/rdk_s_doc/en/Advanced_development/mcu_development/mcu_ethercat)
