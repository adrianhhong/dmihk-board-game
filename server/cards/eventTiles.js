const eventTiles = [
  {
    type: "Normal",
    title: "Motive of Crime",
    elements: ["Hatred", "Power", "Money", "Love", "Jealousy", "Justice"]
  },
  {
    type: "Normal",
    title: "Weather",
    elements: ["Sunny", "Stormy", "Dry", "Humid", "Cold", "Hot"]
  },
  {
    type: "Normal",
    title: "Hint on Corpse",
    elements: ["Head", "Chest", "Hand", "Leg", "Partial", "All-over"]
  },
  {
    type: "Normal",
    title: "General Impression",
    elements: ["Common", "Creative", "Fishy", "Cruel", "Horrible", "Suspenseful"]
  },
  {
    type: "Normal",
    title: "Corpse Condition",
    elements: ["Still Warm", "Stiff", "Decayed", "Incomplete", "Intact", "Twisted"]
  },
  {
    type: "Normal",
    title: "Victim's Identity",
    elements: ["Child", "Young Adult", "Middle-Aged", "Senior", "Male", "Female"]
  },
  {
    type: "Normal",
    title: "Murderer's Personality",
    elements: ["Arrogant", "Despicable", "Furious", "Greedy", "Forceful", "Perverted"]
  },
  {
    type: "Normal",
    title: "State of The Scene",
    elements: ["Bits and Pieces", "Ashes", "Water Stain", "Cracked", "Disorderly", "Tidy"]
  },
  {
    type: "Normal",
    title: "Victim's Build",
    elements: ["Large", "Thin", "Tall", "Short", "Disfigured", "Fit"]
  },
  {
    type: "Normal",
    title: "Victim's Clothes",
    elements: ["Neat", "Untidy", "Elegant", "Shabby", "Bizarre", "Naked"]
  },
  {
    type: "Normal",
    title: "Evidence Left Behind",
    elements: ["Natural", "Artistic", "Written", "Synthetic", "Personal", "Unrelated"]
  },
  {
    type: "Normal",
    title: "Victim's Expression",
    elements: ["Peaceful", "Struggling", "Frightened", "In Pain", "Blank", "Angry"]
  },
  {
    type: "Normal",
    title: "Time of Death",
    elements: ["Dawn", "Morning", "Noon", "Afternoon", "Evening", "Midnight"]
  },
  {
    type: "Normal",
    title: "Duration of Crime",
    elements: ["Instanteous", "Brief", "Gradual", "Prolonged", "Few Days", "Unclear"]
  },
  {
    type: "Normal",
    title: "Trace at the Scene",
    elements: ["Fingerprint", "Footprint", "Bruise", "Blood Stain", "Body Fluid", "Scar"]
  },
  {
    type: "Normal",
    title: "Noticed by Bystander",
    elements: ["Sudden sound", "Prolonged sound", "Smell", "Visual", "Action", "Nothing"]
  },
  {
    type: "Normal",
    title: "Social Relationship",
    elements: ["Relatives", "Friends", "Colleagues", "Employer/ Employee", "Lovers", "Strangers"]
  },
  {
    type: "Normal",
    title: "Victim's Occupation",
    elements: ["Boss", "Professional", "Worker", "Student", "Unemployed", "Retired"]
  },
  {
    type: "Normal",
    title: "In Progress",
    elements: ["Entertainment", "Relaxation", "Assembly", "Trading", "Visit", "Dining"]
  },
  {
    type: "Normal",
    title: "Sudden Incident",
    elements: ["Power Failure", "Fire", "Conflict", "Loss of Valuables", "Scream", "Nothing"]
  },
  {
    type: "Normal",
    title: "Day of Crime",
    elements: ["Weekday", "Weekend", "Spring", "Summer", "Autumn", "Winter"]
  },
  {
    type: "Special",
    title: "Countdown",
    elements: [
      "The Forensic Scientist draws 2 scene tiles and substitutes them for any 2 scene tiles in the display.  The game ends after the following PRESENTATION is finished."
    ]
  },
  {
    type: "Special",
    title: "Erroneous Information",
    elements: [
      "The Forensic Scientist chooses 1 of the scene tiles on display, and moves its marker to new item on the same tile.  Discard this event tile."
    ]
  },
  {
    type: "Special",
    title: "A Good Twist",
    elements: [
      "The player who correctly solved the crime last game immediately receives a chance to do so. This does not count toward their 1 chance this game. If no player is entitled to this advantage, the Forensic Scientist discards this tile and draws another.  Discard this event tile."
    ]
  },
  {
    type: "Special",
    title: "A Useful Clue",
    elements: [
      "The Forensic Scientist draws 5 Scene tiles, from which they choose 1 to replace any existing tile in the display. The selected tile cannot be another event. Discard this event tile."
    ]
  },
  {
    type: "Special",
    title: "Ruled Out Evidence",
    elements: [
      "Each player must flip over 1 of their own Clue Cards, removing it from consideration. This must be done without discussion. The murderer may not flip over the Key Evidence. (Take this action in counterclockwise order from the Forensic Scientist.) Discard this event tile."
    ]
  },
  {
    type: "Special",
    title: "Secret Testimony",
    elements: [
      "All players except the Forensic Scientist close their eyes.  The witness then opens their eyes, points to a scene tile to eliminate, then closes their eyes. All players then open their eyes and the Forensic Scientist discards the indicated tile and replaces it with a random one. Discard this event tile."
    ]
  }
];

module.exports = eventTiles;
