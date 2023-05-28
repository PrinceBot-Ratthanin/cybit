
> Open this page at [https://princebot-ratthanin.github.io/cybit/](https://princebot-ratthanin.github.io/cybit/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/princebot-ratthanin/cybit** and import

## Edit this project ![Build status badge](https://github.com/princebot-ratthanin/cybit/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/princebot-ratthanin/cybit** and click import

## Blocks preview

## Motor Test

* Move forward

```blocks
input.onButtonPressed(Button.A, () => {
    CyBit.MotorRun(1, 1, 30);
    CyBit.MotorRun(2, 1, 30);
})
```

![A rendered view of the blocks](https://github.com/princebot-ratthanin/cybit/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

## Supported targets

* for PXT/microbit
