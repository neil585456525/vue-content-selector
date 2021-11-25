Inspired by chrome devtool & google-optimize.

This project is trying to build a library to select the html element position and inject content visually in any website!
To achieve this there are a number of primary problems should be solved as bellow.
1. Isolate css from the original page.
* Using shadow dom and custom webpack style-loader config to dynamic inject style into the shadow root.
  I don't using iframe as my solution because I want it can easily communicate with page runtime, and it's also can deploy more smoothly.
2. Selecting page element with the cursor, but don't trigger the element event, also try to optimize the performence as possible.
* Oringinal I used dynamic event binding when any elememnt that cursor hovered, but it can't prevent the original element hover and click behavior, and will cause some performence problem, so I come out another solution. Using an invisible mask and using elementFromPoint API to reach this effect, this can solve both problems.
