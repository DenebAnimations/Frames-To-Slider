var verInfo = "FrameToSlider ver 1.1";
var thisProject = app.project;
var activeComp = thisProject.activeItem.selectedLayers[0];
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

var controler = activeComp.property("Effects").addProperty("ADBE Slider Control")
controler.name = "Frames To Slider";

for (var i = 1; i <= thisProject.item(getCompIndex(targetSource)).numLayers; i++) {
	thisProject.item(getCompIndex(targetSource)).layer(i).transform.opacity.expression = "if (Math.floor(comp('" + thisProject.activeItem.name + "').layer('" + activeComp.name + "').effect('Frames To Slider')('Slider').value) == index-1) {\
	transform.opacity = 100;\
} else {\
	transform.opacity = 0;\
}"
}

app.endUndoGroup();
