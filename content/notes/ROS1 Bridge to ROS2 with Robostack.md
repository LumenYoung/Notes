---
id: ROS1 Bridge to ROS2 with Robostack
aliases: []
tags:
  - ros
  - troubleshoot
  - robostack
date: "2024-10-01"
modified: "2024-11-15"
title: ROS1 Bridge to ROS2 with Robostack
---

一直觉得 [robostack](https://robostack.github.io/GettingStarted.html) 可以完成一些很有趣的事情，其中最有趣的设想就是在有两个 ros installation 的情况下在不用 container 的情况下在一台电脑上跑 ros1 和 ros2 的 node 并相互通信。

Robostack 已经可以将在一台电脑上装多个 ros 发行版这件事情简化到极致了。但是一个 missing piece - 两个发行版之间的通信 （尤其是 ros1 与 ros2 之间的通信） 则需要由 [ros1_bridge](https://github.com/ros2/ros1_bridge) 来完成。这个官方提供的 hack 可以在两侧同步消息，但问题在于：他的编译就需要你在一台电脑上有两个 ros 发行版 ... 如果没有 robostack，这就是一个 catch 22 的问题了。

## How to then ?

但是今天晚上尝试了一下，发现这个问题其实很简单，在你 1) 使用 robostack 安装好两个 ros 虚拟环境 2) 准备好 ros1_bridge package 在本地的 ros worspace 之后，需要做的只有几个关键步骤：

1. source ros1 path. 这个可以通过找到你对应的虚拟环境根目录来完成，比如：

```zsh
source ~/.mamba/envs/ros1/setup.zsh
```

2. source ros2 path. 同上：

```zsh
source ~/.mamba/envs/ros2/setup.zsh
```

3. export `ROS_MASTER_URI`:

```zsh
export ROS_MASTER_URI=http://localhost:11311
```

4. build explicitly for the `ros1_bridge`:

```zsh
colcon build --symlink-install --packages-select ros1_bridge --cmake-force-configure
```

There you go, you can use the dynamic bridge example provided by `ros1_bridge` now! That is pretty cool a technique.
