'use strict';

landingPageWiz.factory('templates', function(){
  var templates = [
			{ "id": 1,
				"title": "Dictionary",
				"description": "Meaningful",
				"features": [
					"A feature",
					"Another feature"
				],
				"buildTime": "1 Week",
				"custom": true
			},
	    { "id": 2,
				"title": "Parallax",
				"description": "Its a Parallax, relax.",
				"features": [
					"Neat feature",
					"Feat neature"
				],
				"buildTime": "5 Days",
				"custom": true
			},
	    { "id": 3,
				"title": "Clean Grid",
				"description": "vClean",
				"features": [
					"Clean",
					"Griddle Cakes"
				],
				"buildTime": "4 Days",
				"custom": true
			},
      { "id": 4,
        "title": "Standard I",
        "description": "Simple Standard Template",
        "features": [
          "Very Simple",
          "Very Quick"
        ],
        "buildTime": "3 Hours",
        "custom": false
      },
      { "id": 5,
        "title": "Standard II",
        "description": "Intermediate Standard Template",
        "features": [
          "Kinda Simple",
          "Kinda Quick"
        ],
        "buildTime": "1 Day",
        "custom": false
      },
      { "id": 6,
        "title": "Standard III",
        "description": "Involved Standard Template",
        "features": [
          "Does more",
          "A lot more"
        ],
        "buildTime": "2 Days",
        "custom": false
      }
	];

  return templates;
});
