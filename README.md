## Whiteboard attempt 0

Here is an attempt to create a simple and fast
whiteboard app to draw and share schemes.

That's a question - if it has sence to keep each figure as
a set of editable data at it's own layer.

Potentially it allows to change/move already created
shapes, but is it ok for a 'simple and fast' app?

00d59c54bfed434fddbb4f971ce811c2c18417f4 : there is a nice working version
but seems it would be nice to change architecture a bit.

Need to add:
* renderer - to render separate layers into imagedata
* renderer queue - to put changed layers there to be rerendered, I think it should be two-prios -
the current level should be rerendered first
* unsearizable collection on layers - to keep prerendered imagedatas there. Togethere with renderer objects? Will think about it.

PROS: it will allow to process changes in multiple layers data at the same time. That will be quite useful if we are going to create a multiuser service.
CONS: it will be much more complex and (possible) slowlier, some optimisation and testing will be required.