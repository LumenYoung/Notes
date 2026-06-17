---
id: Package Libfranka in Conda
aliases: []
tags:
  - conda
  - libfranka
date: "2024-11-16"
modified: "2024-11-23"
title: How to create package for Conda?
---

Since I started using [Robostack](https://robostack.github.io/), I've grown increasingly fond of conda. This led me to want to package software I need, but I hadn't previously understood Conda's packaging process. I attempted to package a specific version of [libfranka](https://github.com/frankaemika/libfranka) for my usage today and found it surprisingly simple, requiring only two files.

## Required files

`build.sh`: As the title suggests, it is the build entry for the respective package.

```bash
#!/bin/bash

mkdir build
cd build

cmake -DCMAKE_BUILD_TYPE=Release \
      -DBUILD_TESTS=OFF \
      -DBUILD_EXAMPLES=OFF \
      -DCMAKE_PREFIX_PATH=$PREFIX \
      -DCMAKE_INSTALL_PREFIX=$PREFIX \
      ..

make -j${CPU_COUNT}
make install
```

`meta.yaml`: Also intuitively understandable from the title. It contains the metadata of the package. Below is my example for `libfranka`.

```yaml
{% set name = "libfranka" %}
{% set version = "0.9.2" %}

package:
  name: {{ name }}
  version: {{ version }}

source:
  path: ..

build:
  number: 0
  skip: True  # [not linux]

requirements:
  build:
    - {{ compiler('cxx') }}
    - cmake >=3.4
    - make
  host:
    - eigen
    - poco
  run:
    - eigen
    - poco

about:
  home: https://frankaemika.github.io/docs
  license: Apache-2.0
  summary: Official C++ library for Franka Emika research robots
```

I placed all these files in the `<repo_root>/conda` directory, which is why the source in the `meta.yaml` is set to the parent directory.

## How to build?

Simply use `conda build conda` in the root directory of the repository.

Then you can install this package. I'm using micromamba so it is `micromamba install -c local libfranka`.
