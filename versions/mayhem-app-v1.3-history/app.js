
let history = [];

function logHistory(action, value) {
  const timestamp = new Date().toLocaleTimeString();
  history.unshift(`[${timestamp}] ${action}: ${value}`);
  const log = document.getElementById("history-log");
  if (log) {
    log.innerHTML = history.slice(0, 50).map(item => `<div>${item}</div>`).join('');
  }
}

function clearHistory() {
  history = [];
  const log = document.getElementById("history-log");
  if (log) log.innerHTML = "<strong>Session History:</strong>";
}

function exportHistory() {
  const text = history.join('\n');
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "mayhem_history.txt";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

const tables = {
  "battleCries": [
    "Let's roll for damage and dignity!",
    "Who wants a concussion with confetti?",
    "This one\u2019s for the glitter gods!",
    "I fight for the thrill, the flair, and the follow-through!",
    "Bring me my lutekelele\u2026 it\u2019s time.",
    "My soul is punk, my sword is jazz.",
    "Try me. I double dare you.",
    "Who\u2019s got backup? I don\u2019t need it.",
    "Oops, was that your spell slot?",
    "Let chaos reign!",
    "Say goodbye to the fourth wall!",
    "I\u2019m not angry. I\u2019m just drawn this way.",
    "I didn\u2019t come here to win\u2014I came here to entertain.",
    "Now entering: Maximum Mayhem Mode.",
    "I roll to ruin your vibe.",
    "Chaos is my co-pilot.",
    "Messy? Yes. Magical? Also yes.",
    "Sparkles now, apologies never.",
    "Time to weaponize whimsy.",
    "If you liked it, you should\u2019ve counterspelled it."
  ],
  "wildMagic": [
    "You swap bodies with the nearest ferret.",
    "Everything turns polka-dot for 1d4 hours.",
    "You summon a mariachi band that follows you around.",
    "Your voice echoes like you're in a cavern.",
    "You sneeze and cast Fireball centered on yourself.",
    "You grow a long, silken wizard beard. It grants no power.",
    "Gravity is now optional for your pants.",
    "You shout 'BANG!' and a firework goes off\u2026 somewhere.",
    "You glow like a disco ball in combat.",
    "For the next minute, you must narrate your actions in rhyme.",
    "Your next spell is accompanied by a kazoo orchestra.",
    "All beverages within 30 feet turn into soda.",
    "You briefly become a cartoon version of yourself.",
    "You become magnetic, but only to forks and spoons.",
    "Everyone sees your childhood imaginary friend.",
    "Roll again. But louder.",
    "You\u2019re stuck singing everything you say for the next 10 minutes.",
    "Your shadow detaches and starts mimicking others.",
    "You get a theme song for 1d4 rounds. It\u2019s loud.",
    "You smell like victory. And bubblegum."
  ],
  "disasterSeverity": [
    "Mildly inconvenient: A shoe flies off.",
    "Someone\u2019s hat catches fire, but it\u2019s fine.",
    "You trip, but make it look intentional.",
    "Awkward silence. And then a loud crash.",
    "Moderate disruption: A table flips.",
    "Spilled drinks everywhere\u2014someone screams.",
    "Something explodes. No one knows why.",
    "A rival shows up mid-battle.",
    "You accidentally summon a goat. It\u2019s angry.",
    "Chaotic mess: Your loot is now cursed.",
    "A storm begins inside the tavern.",
    "All lights dim. A disembodied laugh echoes.",
    "A wall collapses, revealing\u2026 another wall.",
    "Someone starts a slow clap. No one joins in.",
    "You turn invisible, but only from yourself.",
    "Total catastrophe: An elder god appears. Hungry.",
    "Reality wavers. Roll to resist becoming a musical.",
    "You fall through the floor\u2014into another campaign setting.",
    "The villain monologues. You\u2019re in the splash zone.",
    "You win initiative but forget what you were doing."
  ],
  "introLines": [
    "I'm a slippery floor in a tavern brawl.",
    "I'm the wind that blows your skirt up mid-duel.",
    "I'm the torch that lights the wrong end of the fuse.",
    "I'm the reason your d20 betrayed you.",
    "I'm the glitter in your healing potion.",
    "I'm the trap labeled 'Not a trap.'",
    "I'm the song that gets stuck in your head mid-spellcast.",
    "I'm the reason your backpack is heavier.",
    "I'm the pun you regret laughing at.",
    "I'm the fake mustache on your wanted poster.",
    "I'm the owlbear in your rearview mirror.",
    "I'm the lockpick that breaks at the worst time.",
    "I'm the potion labeled 'Maybe.'",
    "I'm the thunderwave at a wedding.",
    "I'm the bard your DM warned you about.",
    "I'm the wink before the wild magic surge.",
    "I'm the scroll with mystery stains.",
    "I'm the feather in your chaos cap.",
    "I'm the echo when you say 'Hello?' in a dungeon.",
    "I'm the third wish you didn\u2019t think through.",
    "I'm the unstable illusion that still fooled you.",
    "I'm the mirror that winks back.",
    "I'm the dice that never land square.",
    "I'm the sidekick who takes center stage.",
    "I'm the wild surge in your stable plan.",
    "I'm the charisma check that ruins diplomacy.",
    "I'm the banana peel in the boss fight.",
    "I'm the haunting refrain of last session's joke.",
    "I'm the confetti cannon in the stealth mission.",
    "I'm the nat 1 on your concentration check."
  ]
};

let score = 0;
let lastResult = "";

function rollTable() {
  const select = document.getElementById("table-select").value;
  const results = tables[select];
  let attempts = 0;
  let random;
  do {
    random = results[Math.floor(Math.random() * results.length)];
    attempts++;
  } while (random === lastResult && attempts < 10);
  lastResult = random;
  document.getElementById("result").textContent = random;
  logHistory("Rolled from " + select, random);
  if (document.getElementById('toggle-sound').checked) {
    document.getElementById('sfx-roll').play();
  }
}

function updateScore(delta) {
  score += delta;
  document.getElementById("score").textContent = score;
  updateMeter();
  logHistory("Score " + (delta > 0 ? "increased to" : "decreased to"), score);
}

function updateMeter() {
  const meter = document.getElementById("chaos-meter-fill");
  const label = document.getElementById("chaos-meter-label");
  let percent = Math.min(Math.max(score, 0), 100);
  meter.style.width = percent + "%";

  if (percent < 20) label.textContent = "Chill";
  else if (percent < 40) label.textContent = "Tense";
  else if (percent < 60) label.textContent = "Rowdy";
  else if (percent < 80) label.textContent = "Unhinged";
  else label.textContent = "TOTAL MAYHEM";
}

function copyResult() {
  const resultText = document.getElementById("result").innerText;
  if (!resultText) return;

  navigator.clipboard.writeText(resultText).then(() => {
    const feedback = document.getElementById("copy-feedback");
    feedback.style.display = "inline";
    setTimeout(() => feedback.style.display = "none", 1500);
  });
}

function saveFavorite() {
  if (!lastResult) return;
  let favorites = JSON.parse(localStorage.getItem("mayhemFavorites") || "[]");
  if (!favorites.includes(lastResult)) {
    favorites.push(lastResult);
    localStorage.setItem("mayhemFavorites", JSON.stringify(favorites));
    alert("Favorite saved!");
    logHistory("Favorite saved", lastResult);
  } else {
    alert("Already in favorites.");
  }
}

function showFavorites() {
  const favorites = JSON.parse(localStorage.getItem("mayhemFavorites") || "[]");
  alert("Favorites:\n\n" + favorites.join("\n\n"));
}
