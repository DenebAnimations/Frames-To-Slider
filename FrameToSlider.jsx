var verInfo = "FrameToSlider ver 1.0";
var thisProject = app.project;
var activeComp = thisProject.activeItem;
var targetSource = prompt("Target Source Composition (the one that contains frames)", "Target Composition", verInfo);

function getCompIndex(compName) {
	for (var i = 1; i <= thisProject.numItems; i++) {
		if ((thisProject.item(i).name == compName) && (thisProject.item(i) instanceof CompItem)) {
			return i;
		}
	}
	return null;
}

app.beginUndoGroup(verInfo);

var slider = activeComp.layers.addNull();
slider.source.name = "Slider";
var controler = slider.effects.addProperty("ADBE Slider Control");
controler.name = "Frame To Slider";

for (var i = 1; i <= thisProject.item(getCompIndex(targetSource)).numLayers; i++) {
	thisProject.item(getCompIndex(targetSource)).layer(i).transform.opacity.expression = "if (Math.floor(comp('Main Comp').layer('Slider').effect('Frame To Slider')('Slider')) == index-1 {\
	transform.opacity = 100;\
} else {\
	transform.opacity = 0;\
	";
}

app.endUndoGroup();
}

