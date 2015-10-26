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
				"custom": true,
        "defaultCampaignId": 2
			},
	    { "id": 2,
				"title": "Parallax",
				"description": "Its a Parallax, relax.",
				"features": [
					"Neat feature",
					"Feat neature"
				],
				"buildTime": "5 Days",
				"custom": true,
        "defaultCampaignId": 2
			},
	    { "id": 3,
				"title": "Clean Grid",
				"description": "vClean",
				"features": [
					"Clean",
					"Griddle Cakes"
				],
				"buildTime": "4 Days",
				"custom": true,
        "defaultCampaignId": 2
			},
      { "id": 4,
        "title": "Standard I",
        "description": "Simple Standard Template",
        "features": [
          "Very Simple",
          "Very Quick"
        ],
        "buildTime": "3 Hours",
        "custom": false,
        "defaultCampaignId": 2
      },
      { "id": 5,
        "title": "Standard II",
        "description": "Intermediate Standard Template",
        "features": [
          "Kinda Simple",
          "Kinda Quick"
        ],
        "buildTime": "1 Day",
        "custom": false,
        "defaultCampaignId": 2
      },
      { "id": 6,
        "title": "Standard III",
        "description": "Involved Standard Template",
        "features": [
          "Does more",
          "A lot more"
        ],
        "buildTime": "2 Days",
        "custom": false,
        "defaultCampaignId": 2
      }
	];

  return templates;
});

landingPageWiz.factory('campaigns', function(){
  var campaigns = [
			{ "id": 1,
				"title": "Special Surgery Event",
				"url": "http://google.com",
				"topic": "Surgery",
				"type": "Event",
        "templateId": "4"
			},
      { "id": 2,
        "title": "Surgery Testimonials",
        "url": "http://yahoo.com",
        "topic": "Surgery",
        "type": "Testimonials",
        "templateId": "4"
      },
      { "id": 3,
        "title": "Pediatric Testimonials",
        "url": "http://aol.com",
        "topic": "Pediatric",
        "type": "Testimonials",
        "templateId": "5"
      },
      { "id": 4,
        "title": "My Fancy Campaign",
        "url": "http://hooli.xyz",
        "topic": "Womens",
        "type": "Location",
        "templateId": "1"
      },
      { "id": 5,
        "title": "Camp 5",
        "url": "http://hooli.xyz",
        "topic": "Pediatric",
        "type": "Location",
        "templateId": "2"
      },
      { "id": 6,
        "title": "Le VI",
        "url": "http://hooli.xyz",
        "topic": "Mens",
        "type": "Location",
        "templateId": "2"
      },
      { "id": 7,
        "title": "Campy VII",
        "url": "http://hooli.xyz",
        "topic": "Womens",
        "type": "Event",
        "templateId": "2"
      },
      { "id": 8,
        "title": "OctoCamp",
        "url": "http://hooli.xyz",
        "topic": "Mens",
        "type": "Event",
        "templateId": "3"
      },
      { "id": 9,
        "title": "Campy 9",
        "url": "http://hooli.xyz",
        "topic": "Womens",
        "type": "Location",
        "templateId": "3"
      },
      { "id": 10,
        "title": "Campaign X",
        "url": "http://hooli.xyz",
        "topic": "Womens",
        "type": "FAQ",
        "templateId": "6"
      },
      { "id": 11,
        "title": "One one 11",
        "url": "http://hooli.xyz",
        "topic": "Surgery",
        "type": "Location",
        "templateId": "6"
      }
	];

  return campaigns;
});
