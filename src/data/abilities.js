const abilities = [
    {
        "id": "defensive-stance",
        "name": "Defensive Stance",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This Pokémon assumes a defensive stance, increasing its Defense by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "defense",
            "boostAmount": "x",
            "boostedTypes": [
                "Normal"
            ]
        },
        "bonuses": [
            {
                "name": "Defensive Stance",
                "bonus": "x% Defense Boost"
            }
        ]
    },
    {
        "id": "cleanse-aura",
        "name": "Cleanse Aura",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This passive move gives the Pokémon a x% chance of curing any change of status at the end of each turn.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "healStatus",
            "chance": "x"
        },
        "bonuses": [
            {
                "name": "Cleanse Aura",
                "bonus": "x% chance of curing any change of status at the end of each turn."
            }
        ]
    },
    {
        "id": "nimble-feet",
        "name": "Nimble Feet",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This passive move increases the evasiveness of the user by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "evasion",
            "boostAmount": "x"
        },
        "bonuses": [
            {
                "name": "Nimble Feet",
                "bonus": "x% Evasion Boost"
            }
        ]
    },
    {
        "id": "mind-shield",
        "name": "Mind Shield",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This passive move increases the Special Defense of Normal-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "specialDefense",
            "boostAmount": "x",
            "boostedTypes": [
                "Normal"
            ]
        },
        "bonuses": [
            {
                "name": "Mind Shield",
                "bonus": "x% Special Defense Boost to Normal-type Pokémon"
            }
        ]
    },
    {
        "id": "mutation-boost",
        "name": "Mutation Boost",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This passive move increases the chance of moves to cause status changes by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "status",
            "boostAmount": "x",
            "boostedTypes": []
        },
        "bonuses": [
            {
                "name": "Status Boost",
                "bonus": "x% Chance Increase for Moves to Cause Status Changes"
            }
        ]
    },
    {
        "id": "steady-eye",
        "name": "Steady Eye",
        "level": null,
        "points": null,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "The user focuses intensely, improving accuracy by x% and decreasing the target's dodge chance by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "bonuses": [
            {
                "name": "Sharp Focus",
                "bonus": "Increases accuracy by x% and decreases target's dodge chance by x%"
            }
        ],
        "effects": [
            {
                "type": "boost",
                "boostType": "accuracy",
                "boostAmount": 1,
                "target": "user"
            },
            {
                "type": "boost",
                "boostType": "dodge",
                "boostAmount": -1,
                "target": "opponent"
            }
        ]
    },
    {
        "id": "swift-foot",
        "name": "Swift Foot",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This passive move increases the Speed of the user's Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "speed",
            "boostAmount": "x",
            "boostedTypes": [
                "self"
            ]
        },
        "bonuses": [
            {
                "name": "Swift Foot",
                "bonus": "x% Speed Boost to user's Pokémon"
            }
        ]
    },
    {
        "id": "normal-strike",
        "name": "Normal Strike",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This passive move increases the Attack of Normal-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "attack",
            "boostAmount": "x",
            "boostedTypes": [
                "Normal"
            ]
        },
        "bonuses": [
            {
                "name": "Power Boost",
                "bonus": "x% Attack Boost to Normal-type Pokémon"
            }
        ]
    },
    {
        "id": "tough-hide",
        "name": "Tough Hide",
        "level": 0,
        "points": 0,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "This passive move increases the resistance of Normal-type Pokemon against Fighting-type moves by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "resistance",
            "boostAmount": "x",
            "boostedTypes": [
                "Normal"
            ],
            "againstTypes": [
                "Fighting"
            ]
        },
        "bonuses": [
            {
                "name": "Tough Hide",
                "bonus": "x% Resistance Boost to Normal-type Pokemon against Fighting-type moves"
            }
        ]
    },
    {
        "id": "scrappy",
        "name": "Scrappy",
        "level": null,
        "points": null,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "Enables moves to hit Ghost-type foes.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "target",
            "target": "foe",
            "condition": {
                "type": "type",
                "operator": "==",
                "value": "Ghost"
            },
            "removeImmunity": true
        }
    },
    {
        "id": "technician",
        "name": "Technician",
        "level": null,
        "points": null,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "Boosts the power of moves that have a power of 60 or less.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 1.5,
            "target": "self",
            "condition": {
                "type": "basePower",
                "operator": "<=",
                "value": 60
            }
        }
    },
    {
        "id": "cut",
        "name": "Cut",
        "level": 1,
        "points": 1,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "The target is cut with a scythe or claw. This can also be used to cut down thin trees.",
        "damage": 50,
        "energy": 25,
        "accuracy": "95",
        "categoryImg": "physical.png",
        "category": "Physical Move",
        "effect": null,
        "effectRate": null,
        "baseDamage": 50,
        "baseEnergy": 25,
        "baseCriticalHitRate": 0.0625,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Cut",
                "bonus": "Can also be used to cut down thin trees"
            }
        ]
    },
    {
        "id": "fly",
        "name": "Fly",
        "level": 30,
        "points": 5,
        "type": "Flying",
        "typeImg": "flying.png",
        "description": "The user flies up into the sky and then strikes its target on the next turn.",
        "damage": 90,
        "energy": 50,
        "accuracy": "95",
        "categoryImg": "physical.png",
        "category": "Physical Move",
        "effect": {
            "type": "fly",
            "turns": 2,
            "target": "user"
        },
        "effectRate": null,
        "baseDamage": 90,
        "baseEnergy": 50,
        "baseCriticalHitRate": 0.125,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Fly",
                "bonus": "User is immune to Ground-type moves on first turn"
            }
        ]
    },
    {
        "id": "air-precision",
        "name": "Air Precision",
        "description": "The user's flying type moves are more accurate, increasing their accuracy by 20%.",
        "type": "Flying",
        "typeImg": "flying.png",
        "category": "Passive Move",
        "effect": {
            "type": "stat_change",
            "stat": "accuracy",
            "value": 2,
            "target": "self"
        },
        "effectRate": null,
        "bonuses": [
            {
                "name": "Keen Eye",
                "bonus": "Increases accuracy of all moves by 10%."
            },
            {
                "name": "Tangled Feet",
                "bonus": "Increases evasion by 10% when confused."
            }
        ]
    },
    {
        "id": "aerial-mastery",
        "name": "Aerial Mastery",
        "description": "The Pokémon has mastered the art of aerial combat, increasing the accuracy and power of Flying-type moves.",
        "type": "Flying",
        "typeImg": "flying.png",
        "effect": {
            "type": "passive",
            "stat": "attack",
            "value": 10
        },
        "bonuses": [
            {
                "name": "Aerial Ace",
                "bonus": "Increases the base power of Aerial Ace by 20%"
            },
            {
                "name": "Acrobatics",
                "bonus": "Increases the base power of Acrobatics by 20% if the user is not holding an item"
            },
            {
                "name": "Sky Attack",
                "bonus": "Increases the base power of Sky Attack by 20%"
            }
        ]
    },
    {
        "id": "surf",
        "name": "Surf",
        "level": 45,
        "points": 7,
        "type": "Water",
        "typeImg": "water.png",
        "description": "The user attacks everything around it with a giant wave. This can also be used for crossing water.",
        "damage": 90,
        "energy": 60,
        "accuracy": "100",
        "categoryImg": "special.png",
        "category": "Special Move",
        "effect": null,
        "effectRate": null,
        "baseDamage": 90,
        "baseEnergy": 60,
        "baseCriticalHitRate": 0.0625,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Surf",
                "bonus": "Can also be used to cross bodies of water"
            }
        ]
    },
    {
        "id": "feather-shield",
        "name": "Feather Shield",
        "description": "A passive move that increases the defense of Flying-type Pokemon.",
        "type": "Flying",
        "typeImg": "flying.png",
        "effect": {
            "type": "primary",
            "stat": "defense",
            "modifier": 0.2
        },
        "bonuses": [
            {
                "name": "Roost",
                "bonus": "When a Flying-type Pokemon uses Roost, its defense and special defense are restored to maximum."
            },
            {
                "name": "Pressure",
                "bonus": "When a Flying-type Pokemon with Pressure is targeted by a move, the opposing Pokemon uses 2 PP instead of 1."
            }
        ]
    },
    {
        "id": "defog",
        "name": "Defog",
        "level": 30,
        "points": 4,
        "type": "Flying",
        "typeImg": "flying.png",
        "description": "A strong wind blows away the target's barriers such as Reflect or Light Screen. This also lowers the target's evasiveness.",
        "damage": null,
        "energy": 50,
        "accuracy": "—",
        "categoryImg": "status.png",
        "category": "Status Move",
        "effect": [
            {
                "type": "secondary",
                "chance": null,
                "status": "barrier"
            },
            {
                "type": "secondary",
                "chance": null,
                "stat": "evasiveness",
                "change": -1,
                "target": "target"
            }
        ],
        "effectRate": null,
        "baseDamage": null,
        "baseEnergy": 50,
        "baseCriticalHitRate": 0,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Gale Wings",
                "bonus": "When user has full HP, flying-type moves have their priority increased by 1."
            }
        ]
    },
    {
        "id": "strength",
        "name": "Strength",
        "level": null,
        "points": null,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "The target is slugged with a punch thrown at maximum power. This move can also move boulders.",
        "damage": 80,
        "energy": 45,
        "accuracy": "100",
        "categoryImg": "physical.png",
        "category": "Physical Move",
        "effect": null,
        "effectRate": null,
        "baseDamage": 80,
        "baseEnergy": 45,
        "baseCriticalHitRate": 0.0625,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Rock Smash",
                "bonus": "-1 Enemy Defense"
            },
            {
                "name": "Superpower",
                "bonus": "-1 User Attack, -1 User Defense"
            }
        ]
    },
    {
        "id": "flash",
        "name": "Flash",
        "level": null,
        "points": null,
        "type": "Electric",
        "typeImg": "electric.png",
        "description": "Lowers the target's accuracy by one stage.",
        "categoryImg": "other.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "accuracy",
            "boostAmount": -1,
            "target": "enemy"
        }
    },
    {
        "id": "whirlpool",
        "name": "Whirlpool",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Traps the target in a violent swirling whirlpool for four to five turns.",
        "damage": 35,
        "energy": 25,
        "accuracy": "85",
        "categoryImg": "special.png",
        "category": "Special Move",
        "effect": {
            "type": "lockIn",
            "lockInTarget": "enemy",
            "turns": "4-5",
            "damage": 35,
            "energy": 25,
            "accuracy": "85"
        },
        "effectRate": null,
        "baseDamage": 35,
        "baseEnergy": 25,
        "baseCriticalHitRate": 0.0625,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Rain Dance",
                "bonus": "+10% Accuracy"
            },
            {
                "name": "Whirlpool",
                "bonus": "+10% Damage"
            }
        ]
    },
    {
        "id": "dive",
        "name": "Dive",
        "level": 40,
        "points": 5,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Diving on the first turn, the user floats up and attacks on the next turn.",
        "damage": 80,
        "energy": 60,
        "accuracy": "100",
        "categoryImg": "physical.png",
        "category": "Physical Move",
        "effect": null,
        "effectRate": null,
        "baseDamage": 80,
        "baseEnergy": 60,
        "baseCriticalHitRate": 0.125,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Torrent",
                "bonus": "When user has less than 1/3 HP, water-type moves deal 50% more damage."
            },
            {
                "name": "Rain Dance",
                "bonus": "When used during rain, power of water-type moves is increased by 50%."
            }
        ]
    },
    {
        "id": "rock-climb",
        "name": "Rock Climb",
        "level": 45,
        "points": 6,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "The user attacks the target by smashing into it with incredible force. This may also confuse the target.",
        "damage": 90,
        "energy": 70,
        "accuracy": "85",
        "categoryImg": "physical.png",
        "category": "Physical Move",
        "effect": {
            "type": "secondary",
            "chance": 20,
            "status": "confusion"
        },
        "effectRate": null,
        "baseDamage": 90,
        "baseEnergy": 70,
        "baseCriticalHitRate": 0.125,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Guts",
                "bonus": "When user is inflicted with a status condition, physical moves deal 50% more damage."
            },
            {
                "name": "Sheer Force",
                "bonus": "When user uses a move with a secondary effect, its base power is increased by 30%, but the secondary effect is removed."
            }
        ]
    },
    {
        "id": "waterfall",
        "name": "Waterfall",
        "level": 35,
        "points": 5,
        "type": "Water",
        "typeImg": "water.png",
        "description": "The user charges the target at an overwhelming speed, crashing into it forcefully. This may also make the target flinch.",
        "damage": 80,
        "energy": 60,
        "accuracy": "100",
        "categoryImg": "physical.png",
        "category": "Physical Move",
        "effect": {
            "type": "secondary",
            "chance": 20,
            "status": "flinch"
        },
        "effectRate": null,
        "baseDamage": 80,
        "baseEnergy": 60,
        "baseCriticalHitRate": 0.125,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Torrent",
                "bonus": "When user has less than 1/3 HP, water-type moves deal 50% more damage."
            },
            {
                "name": "Rain Dance",
                "bonus": "When used during rain, power of water-type moves is increased by 50%."
            }
        ]
    },
    {
        "id": "rock-smash",
        "name": "Rock Smash",
        "level": 10,
        "points": 2,
        "type": "Fighting",
        "typeImg": "fighting.png",
        "description": "The user slugs the foe with a shattering punch. This may also lower the target's Defense stat.",
        "damage": 40,
        "energy": 25,
        "accuracy": "100",
        "categoryImg": "physical.png",
        "category": "Physical Move",
        "effect": {
            "type": "secondary",
            "chance": 50,
            "statChanges": {
                "target": "defense",
                "change": -1,
                "chance": 100
            }
        },
        "effectRate": null,
        "baseDamage": 40,
        "baseEnergy": 25,
        "baseCriticalHitRate": 0.0625,
        "speedPriority": 0,
        "bonuses": [
            {
                "name": "Guts",
                "bonus": "When user is inflicted with a status condition, physical moves deal 50% more damage."
            },
            {
                "name": "Steadfast",
                "bonus": "When user flinches, its Speed is increased by one stage."
            }
        ]
    },
    {
        "id": "aftermath",
        "name": "Aftermath",
        "level": null,
        "points": null,
        "type": "Ghost",
        "typeImg": "ghost.png",
        "description": "Damages the attacker landing the finishing hit by 1/4 its max HP.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "counter",
            "counterType": "damage",
            "counterAmount": 0.25,
            "target": "foe",
            "condition": {
                "type": "lastHit",
                "operator": "==",
                "value": "self"
            }
        }
    },
    {
        "id": "dryskin",
        "name": "Dry Skin",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Reduces HP if it is hot. Water restores HP.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "heal",
            "healType": "damage",
            "healAmount": 0.25,
            "target": "self",
            "condition": {
                "type": "weather",
                "operator": "==",
                "value": "Sun"
            }
        }
    },
    {
        "id": "arena-trap",
        "name": "Arena Trap",
        "level": null,
        "points": null,
        "type": "Ground",
        "typeImg": "ground.png",
        "description": "Prevents the foe from fleeing.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "block",
            "blockType": "flee",
            "condition": {
                "type": "ability",
                "abilityId": "arena-trap"
            }
        },
        "inBattleEffect": {
            "description": "Prevents foes from fleeing or switching out if they are not immune to Ground-type moves.",
            "shortDescription": "Prevents foes from fleeing or switching out."
        },
        "overworldEffect": {
            "description": "Prevents encounters with wild Pokémon lower level than the user."
        }
    },
    {
        "id": "battle-armor",
        "name": "Battle Armor",
        "level": null,
        "points": null,
        "type": "Steel",
        "typeImg": "steel.png",
        "description": "Hard armor protects the Pokémon from critical hits.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "immunity",
            "condition": {
                "type": "critical-hit"
            }
        },
        "inBattleEffect": "Protects the Pokémon from critical hits."
    },
    {
        "id": "analytic",
        "name": "Analytic",
        "level": null,
        "points": null,
        "type": "Steel",
        "typeImg": "steel.png",
        "description": "Boosts move power when the user moves last.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 1.3,
            "target": "self",
            "condition": {
                "type": "speed",
                "operator": "<=",
                "value": "foe"
            }
        }
    },
    
    {
        "id": "clear-body",
        "name": "Clear Body",
        "level": null,
        "points": null,
        "type": "Steel",
        "typeImg": "steel.png",
        "description": "Prevents other Pokemon from lowering its stats.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "stat-mod",
            "stat": [
                "attack",
                "defense",
                "special-attack",
                "special-defense",
                "speed"
            ],
            "target": "self",
            "modifier": "clear-body",
            "modifierType": "ability",
            "condition": {
                "type": "modifier",
                "modifier": "lower",
                "value": 1,
                "target": "opponent"
            }
        }
    },
    {
        "id": "drought",
        "name": "Drought",
        "level": null,
        "points": null,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "Summons intense sunlight that lasts for 5 turns upon entering the battle.",
        "categoryImg": "active.png",
        "category": "Active Move",
        "effect": {
            "type": "weather",
            "weatherType": "sun",
            "turns": 5,
            "target": "field"
        },
        "overworldEffect": "In sunny weather, the power of Fire-type moves is increased by 50%."
    },
    {
        "id": "flame-body",
        "name": "Flame Body",
        "level": null,
        "points": null,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "Contact with the Pokemon may burn the opponent.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "status",
            "status": "burn",
            "target": "opponent",
            "chance": 0.3,
            "condition": {
                "type": "contact"
            }
        }
    },
    {
        "id": "flash-fire",
        "name": "Flash Fire",
        "level": null,
        "points": null,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "Raises Fire-type moves by 50% when hit by a Fire-type move.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "move",
            "moveType": "Fire",
            "boostAmount": 1.5,
            "target": "self",
            "condition": {
                "type": "move-used",
                "moveType": "Fire"
            }
        }
    },
    {
        "id": "blazing-aura",
        "name": "Blazing Aura",
        "level": null,
        "points": null,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "The user emits a blazing aura that increases the damage of Fire-type moves used by itself and its allies by 20%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "bonuses": [
            {
                "name": "Blazing Aura",
                "bonus": "Increases the damage of Fire-type moves by 20%"
            }
        ],
        "effect": {
            "type": "passive",
            "boostType": "damage",
            "boostAmount": 20,
            "target": "userAndAllies",
            "moveType": "Fire"
        }
    },
    {
        "id": "blazing-strike",
        "name": "Blazing Strike",
        "level": 50,
        "points": 10,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "This passive move increases the physical damage of Fire-type moves by 20%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "physical",
            "boostAmount": 20,
            "boostedTypes": [
                "Fire"
            ]
        }
    },
    {
        "id": "dragonfire-boost",
        "name": "Dragonfire Boost",
        "level": 0,
        "points": 0,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "This Pokémon's fire and dragon type moves deal x% more damage.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "bonuses": [
            {
                "name": "Dragonfire Boost",
                "bonus": "x% Damage Boost to Fire and Dragon Type Moves"
            }
        ]
    },
    {
        "id": "fire-boost",
        "name": "Fire Boost",
        "level": 0,
        "points": 0,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "This passive move increases the Attack of Fire-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "attack",
            "boostAmount": "x",
            "boostedTypes": [
                "Fire"
            ]
        },
        "bonuses": [
            {
                "name": "Fire Boost",
                "bonus": "x% Attack Boost to Fire-type Pokémon"
            }
        ]
    },
    {
        "id": "aqua-ignition",
        "name": "Aqua Ignition",
        "level": 0,
        "points": 0,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "This Pokémon's resilience against water type moves is increased by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "bonuses": [
            {
                "name": "Water Resilience",
                "bonus": "x% Boost to Water Type Damage Resistance"
            }
        ],
        "effect": {
            "type": "resistance",
            "resistedTypes": [
                "Water"
            ],
            "resistanceAmount": "x%"
        }
    },
    {
        "id": "fire-shield",
        "name": "Fire Shield",
        "level": 0,
        "points": 0,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "This Pokémon's Defense and Special Defense are increased by x% when hit by a Fire-type move.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": [
            {
                "type": "boost",
                "boostType": "defense",
                "boostAmount": "x",
                "boostedTypes": [
                    "Fire"
                ]
            },
            {
                "type": "boost",
                "boostType": "specialDefense",
                "boostAmount": "x",
                "boostedTypes": [
                    "Fire"
                ]
            }
        ],
        "bonuses": [
            {
                "name": "Fire Shield",
                "bonus": "x% Increase to Defense and Special Defense When Hit by a Fire-type Move"
            }
        ]
    },
    {
        "id": "fiery-crit",
        "name": "Fiery Crit",
        "level": 0,
        "points": 0,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "This passive move increases the critical hit ratio of Fire-type moves by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "bonuses": [
            {
                "name": "Fiery Crit",
                "bonus": "x% Increased Critical Hit Chance to Fire-Type Moves"
            }
        ],
        "effect": {
            "type": "crit",
            "critType": "Fire",
            "critChance": "x%"
        }
    },
    {
        "id": "thermal-defense",
        "name": "Thermal Defense",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "The Pokémon's body is highly resistant to heat and fire attacks, reducing damage taken from these types of moves. It also increases the Pokémon's Special Defense stat.",
        "effect": {
            "type": "passive",
            "resistance": {
                "type1": "Fire",
                "type2": null,
                "value": 50
            },
            "statBoost": {
                "stat": "Sp. Defense",
                "value": 1.5
            }
        },
        "effectRate": null,
        "bonuses": [
            {
                "name": "Flash Fire",
                "bonus": "When hit by a Fire-type move, power of the user's own Fire-type moves is increased by 50%."
            },
            {
                "name": "Flame Body",
                "bonus": "30% chance of burning the opponent when hit with a contact move."
            }
        ]
    },
    {
        "id": "blaze",
        "name": "Blaze",
        "level": null,
        "points": null,
        "type": "Fire",
        "typeImg": "fire.png",
        "description": "Powers up Fire-type moves in a pinch.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 1.5,
            "boostedTypes": [
                "Fire"
            ],
            "condition": {
                "type": "health",
                "operator": "<=",
                "value": 33.3
            }
        }
    },
    {
        "id": "compound-eyes",
        "name": "Compoundeyes",
        "level": null,
        "points": null,
        "type": "Bug",
        "typeImg": "bug.png",
        "description": "Boosts the accuracy of moves.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "accuracy",
            "boostAmount": 1.3,
            "target": "self"
        }
    },
    {
        "id": "cute-charm",
        "name": "Cute Charm",
        "level": null,
        "points": null,
        "type": "fairy",
        "typeImg": "fairy.png",
        "description": "30% chance of infatuating Pokémon of the opposite gender when using a move that requires making contact.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "status",
            "status": "infatuation",
            "target": "opponent",
            "chance": 0.3,
            "condition": {
                "type": "contact"
            }
        }
    },
    {
        "id": "damp",
        "name": "Damp",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Prevents the use of self-destructing moves.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "prevent",
            "preventType": "self-destruct",
            "target": "opponent"
        }
    },
    {
        "id": "drizzle",
        "name": "Drizzle",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Summons rain that lasts for 5 turns upon entering the battle.",
        "categoryImg": "active.png",
        "category": "Active Move",
        "effect": {
            "type": "weather",
            "weatherType": "rain",
            "turns": 5,
            "target": "field"
        },
        "overworldEffect": "In rainy weather, the power of Water-type moves is increased by 50%."
    },
  
    {
        "id": "early-bird",
        "name": "Early Bird",
        "level": null,
        "points": null,
        "type": "Normal",
        "typeImg": "normal.png",
        "description": "Reduces sleep duration from 2-5 turns to 1 turn.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "status",
            "status": "sleep",
            "target": "self",
            "condition": {
                "type": "duration",
                "duration": {
                    "min": 2,
                    "max": 5
                }
            },
            "modifier": "early-bird",
            "modifierType": "ability",
            "newDuration": 1
        }
    },
  
    {
        "id": "insomnia",
        "name": "Insomnia",
        "level": null,
        "points": null,
        "type": "Dark",
        "typeImg": "dark.png",
        "description": "Prevents the Pokemon from falling asleep.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "status",
            "status": "sleep",
            "target": "self",
            "condition": {
                "type": "modifier",
                "modifier": "prevent",
                "value": true
            }
        }
    },    
    {
        "id": "psychic-slash",
        "name": "Psionic Slash",
        "type": "Psychic",
        "typeImg": "psychic.png",
        "category": "Passive",
        "categoryImg": "passive.png",
        "effect": {
            "type": "StatChange",
            "stat": "Physical Damage",
            "change": 1.2,
            "condition": {
                "type": "MoveType",
                "moveType": "Psychic Slash"
            }
        },
        "description": "Increases the damage of Psychic Slash by 20%."
    },
    
    {
        "id": "sand-veil",
        "name": "Sand Veil",
        "level": null,
        "points": null,
        "type": "Ground",
        "typeImg": "ground.png",
        "description": "Increases the user's evasion by one stage during a sandstorm.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "evasion",
            "boostAmount": 1,
            "condition": "during sandstorm",
            "target": "user"
        }
    },
    {
        "id": "shell-armor",
        "name": "Shell Armor",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Protects the user from critical hits.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "protection",
            "protectionType": "critical",
            "target": "user"
        }
    },
   
    {
        "id": "swift-swim",
        "name": "Swift Swim",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Doubles the user's speed during rain.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "speed",
            "boostAmount": 100,
            "condition": "during rain",
            "target": "user"
        }
    },
    {
        "id": "torrent",
        "name": "Torrent",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Increases the power of Water-type moves by 30% when the user's HP is below or equal to 1/3 of its maximum.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 30,
            "condition": "when user's HP is below or equal to 1/3",
            "target": "user",
            "moveType": "Water"
        }
    },
    {
        "id": "guardian-balance",
        "name": "Guardian's Balance",
        "level": 0,
        "points": 0,
        "type": "Water",
        "typeImg": "water.png",
        "description": "This passive move increases the Defense of Water-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "defense",
            "boostAmount": "x",
            "boostedTypes": [
                "Water"
            ]
        },
        "bonuses": [
            {
                "name": "Water Shield",
                "bonus": "x% Defense Boost to Water-type Pokémon"
            }
        ]
    },
    {
        "id": "water-absorb",
        "name": "Water Absorb",
        "level": null,
        "points": null,
        "type": "Water",
        "typeImg": "water.png",
        "description": "Restores 25% of the user's maximum HP when hit by a Water-type move.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "heal",
            "healType": "percentMaxHp",
            "healAmount": 25,
            "condition": "when hit by Water-type move",
            "target": "user"
        }
    },
    {
        "id": "leaf-armor",
        "name": "Leaf Armor",
        "level": 0,
        "points": 0,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "This passive move increases the Special Defense of Grass-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "specialDefense",
            "boostAmount": "x",
            "boostedTypes": [
                "Grass"
            ]
        },
        "bonuses": [
            {
                "name": "Leaf Armor",
                "bonus": "x% Special Defense Boost to Grass-type Pokémon"
            }
        ]
    },
    {
        "id": "blossom-barrier",
        "name": "Blossom Barrier",
        "type": "Grass",
        "typeImg": "grass.png",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "description": "The Pokemon has developed a resistance to pollen and spores, making it harder for status conditions to take hold, increasing its status resistance by 20%.",
        "effect": {
            "type": "passive",
            "bonusType": "statusResistance",
            "bonusAmount": 20,
            "condition": {
                "type": "statusMatch",
                "matchStatus": "Poisoned|Badly Poisoned|Paralyzed|Asleep|Frozen"
            }
        }
    },
    {
        "id": "fireproof",
        "name": "Fireproof",
        "level": 0,
        "points": 0,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "This passive move grants resistance to Fire-type moves to Grass-type Pokémon.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "resistance",
            "resistedTypes": [
                "Fire"
            ],
            "resistanceAmount": "x%"
        },
        "bonuses": [
            {
                "name": "Fireproof",
                "bonus": "Resistance to Fire-type moves for Grass-type Pokémon"
            }
        ]
    },
    {
        "id": "photosynthesis",
        "name": "Photosynthesis",
        "level": 0,
        "points": 0,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "This passive move increases the Attack of Grass-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "attack",
            "boostAmount": "x",
            "boostedTypes": [
                "Grass"
            ]
        },
        "bonuses": [
            {
                "name": "Photosynthesis",
                "bonus": "x% Special Attack Boost to Grass-type Pokémon"
            }
        ]
    },
    {
        "id": "vampiric-roots",
        "name": "Vampiric Roots",
        "level": 0,
        "points": 0,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "This passive move increases the amount of HP stolen from the target and restores the own HP by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "hpLeech",
            "boostAmount": "x",
            "boostedTypes": [
                "Grass"
            ]
        },
        "bonuses": [
            {
                "name": "Life Leech",
                "bonus": "x% HP Leech and Restore to Grass-type moves"
            }
        ]
    },
    {
        "id": "chlorophyll",
        "name": "Chlorophyll",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "Boosts the Pokémon's Speed stat in harsh sunlight.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "speed",
            "boostAmount": 2,
            "boostedConditions": [
                {
                    "condition": "weather",
                    "value": "harsh sunlight"
                }
            ]
        }
    },
    {
        "id": "effect-spore",
        "name": "Effect Spore",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "Contact with the Pokemon may inflict the opponent with either Sleep, Poison, or Paralysis.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "status",
            "status": [
                "sleep",
                "poison",
                "paralysis"
            ],
            "target": "opponent",
            "chance": 0.3,
            "condition": {
                "type": "contact"
            }
        }
    },
    {
        "id": "overgrow",
        "name": "Overgrow",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "Powers up Grass-type moves when the Pokémon's HP is low.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 1.5,
            "boostedTypes": [
                "Grass"
            ],
            "triggerCondition": {
                "condition": "hp",
                "value": "below 1/3"
            }
        }
    },
    {
        "id": "leaf-guard",
        "name": "Leaf Guard",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "Prevents the Pokémon from being afflicted by non-volatile status conditions during strong sunlight.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "status",
            "status": "Leaf Guard",
            "condition": "strongSunlight",
            "immunity": true
        }
    },
    {
        "id": "natural-cure",
        "name": "Natural Cure",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "All status conditions are healed when the Pokémon switches out.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "heal",
            "healType": "statusConditions",
            "target": "self",
            "trigger": "switchOut"
        }
    },
    {
        "id": "sap-sipper",
        "name": "Sap Sipper",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "Boosts the Pokemon's Attack stat if hit by a Grass-type move, instead of taking damage.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "attack",
            "boostAmount": 1,
            "boostedTypes": [
                "Grass"
            ]
        }
    },
    {
        "id": "flower-veil",
        "name": "Flower Veil",
        "level": null,
        "points": null,
        "type": "Fairy",
        "typeImg": "fairy.png",
        "description": "Prevents the Pokemon and its allies from being affected by Attract and all status conditions.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "immunity",
            "immunityTypes": [
                "attract",
                "status"
            ]
        }
    },
    {
        "id": "solar-power",
        "name": "Solar Power",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "Boosts Sp. Attack, but lowers HP in sunshine.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effects": [
            {
                "type": "boost",
                "boostType": "specialAttack",
                "boostAmount": 1,
                "target": "self"
            },
            {
                "type": "boost",
                "boostType": "hp",
                "boostAmount": "1/8",
                "target": "self",
                "condition": {
                    "weather": "sunny"
                }
            }
        ]
    },
    {
        "id": "grassy-surge",
        "name": "Grassy Surge",
        "level": null,
        "points": null,
        "type": "Grass",
        "typeImg": "grass.png",
        "description": "The user summons a grassy terrain for 5 turns, which boosts the power of grass-type moves and restores HP of grounded Pokémon every turn. It also weakens the power of earthquake-like moves to 1/2.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effects": [
            {
                "type": "terrain",
                "terrain": "Grassy Terrain"
            },
            {
                "type": "heal",
                "healAmount": 0.0625,
                "target": "all",
                "condition": {
                    "grounded": true
                }
            },
            {
                "type": "weaken",
                "weakenType": "Ground",
                "weakenAmount": 0.5
            },
            {
                "type": "boost",
                "boostType": "power",
                "boostAmount": 0.33,
                "boostedTypes": [
                    "Grass"
                ]
            }
        ]
    },
    {
        "id": "evasive-dodge",
        "name": "Evasive Dodge",
        "level": null,
        "points": null,
        "type": "Fighting",
        "typeImg": "fighting.png",
        "description": "This passive move increases the user's evasiveness by x% against special attacks.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "evasion",
            "boostAmount": 1,
            "boostedTypes": [
                "Special"
            ]
        }
    },
    {
        "id": "solid-defense",
        "name": "Solid Defense",
        "level": null,
        "points": null,
        "type": "Fighting",
        "typeImg": "fighting.png",
        "description": "The user gains incredible mental focus, increasing its Defense and Sp. Defense by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "defense",
            "boostAmount": "x",
            "boostedTypes": [
                "Fighting"
            ],
            "secondaryBoostType": "spDefense",
            "secondaryBoostAmount": "x",
            "secondaryBoostedTypes": [
                "Fighting"
            ]
        }
    },
    {
        "id": "defensive-stance",
        "name": "Defensive Stance",
        "level": null,
        "points": null,
        "type": "Fighting",
        "typeImg": "fighting.png",
        "description": "The user takes a defensive stance, increasing its Defense and Sp. Defense by x%, but decreasing its Attack by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effects": [
            {
                "type": "boost",
                "boostType": "defense",
                "boostAmount": 1,
                "target": "self"
            },
            {
                "type": "boost",
                "boostType": "specialDefense",
                "boostAmount": 1,
                "target": "self"
            },
            {
                "type": "boost",
                "boostType": "attack",
                "boostAmount": -2,
                "target": "self"
            }
        ],
        "bonuses": [
            {
                "name": "Inner Focus",
                "bonus": "Immune to flinching"
            },
            {
                "name": "Steadfast",
                "bonus": "Boosts speed when flinched"
            }
        ]
    },
    {
        "id": "mind-over-matter",
        "name": "Mind Over Matter",
        "level": null,
        "points": null,
        "type": "Fighting",
        "typeImg": "fighting.png",
        "description": "The user focuses its mind and channels its inner energy to boost its special attack by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "special",
            "boostAmount": 1,
            "boostedTypes": [
                "Fighting"
            ]
        }
    },        
    {
        "id": "frostbite",
        "name": "Frostbite",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Boosts the power of ice-type moves after landing a critical hit.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 2,
            "boostedTypes": [
                "Ice"
            ],
            "condition": {
                "type": "critical-hit",
                "operator": ">=",
                "value": 1
            },
            "additionalEffect": {
                "type": "status",
                "statusType": "freeze",
                "chance": 0.1
            }
        }
    },
    {
        "id": "frost-aura",
        "name": "Frost Aura",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Increases the chance of freezing the opponent with ice-type moves.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "freeze",
            "boostAmount": 1.5,
            "boostedTypes": [
                "Ice"
            ],
            "additionalEffect": {
                "type": "stat-mod",
                "stat": "speed",
                "target": "opponent",
                "modifier": -1,
                "condition": {
                    "type": "status",
                    "statusType": "freeze"
                }
            }
        }
    },
    {
        "id": "icy-shield",
        "name": "Icy Shield",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Increases the user's defense when hit by a physical attack.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "stat-mod",
            "stat": "defense",
            "target": "self",
            "modifier": 1,
            "condition": {
                "type": "attack-type",
                "attackType": "physical",
                "target": "self"
            }
        }
    },
    {
        "id": "frost-barrier",
        "name": "Frost Barrier",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Creates a barrier of icy crystals that increases the user's special defense for a few turns.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "stat-mod",
            "stat": "special-defense",
            "target": "self",
            "modifier": 1,
            "condition": {
                "type": "turns-active",
                "turns": 3,
                "target": "self"
            }
        }
    },
    {
        "id": "arctic-coat",
        "name": "Arctic Coat",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Creates a protective shield of icy energy that increases the user's resistance to cold attacks for a few turns, raising the user's special defense specifically against cold-type moves.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "stat-mod",
            "stat": "special-defense",
            "target": "self",
            "modifier": 1.5,
            "condition": {
                "type": "type",
                "value": "Ice",
                "target": "opponent"
            },
            "turns": 3
        }
    },
    {
        "id": "winter-ward",
        "name": "Winter Ward",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Creates a layer of frost around the user, increasing their resistance to ice special attacks and providing protection against low temperatures and freezing.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "stat-mod",
            "stat": "special-defense",
            "modifier": 1.5,
            "target": "self",
            "condition": {
                "type": "type",
                "operator": "is",
                "value": "Ice"
            }
        },
        "secondaryEffect": {
            "type": "condition",
            "condition": "frozen",
            "chance": 0.25,
            "immunityChance": 0.1,
            "conditionImg": "frozen.png",
            "description": "Has a 25% chance of freezing the opponent. Additionally, has a 10% chance of making the user immune to being frozen."
        }
    },
    {
        "id": "freezing-aura",
        "name": "Freezing Aura",
        "type": "Ice",
        "category": "Passive Move",
        "description": "Increases the chance of freezing the opponent when hit by a physical move.",
        "effect": {
            "type": "status",
            "statusType": "frozen",
            "target": "opponent",
            "chance": 10,
            "condition": {
                "type": "category",
                "category": "Physical",
                "target": "opponent"
            }
        }
    },
    {
        "id": "frozen-doom",
        "name": "Frozen Doom",
        "type": "Ice",
        "category": "Passive Move",
        "description": "Increases the duration of freezing and deals small damage over time.",
        "effect": {
            "type": "status",
            "statusType": "frozen",
            "target": "opponent",
            "durationBoost": 2,
            "damagePerTurn": 5,
            "condition": {
                "type": "category",
                "category": "Physical",
                "target": "opponent"
            }
        }
    },
    {
        "id": "ice-advantage",
        "name": "Ice Advantage",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Increases damage against not very effective types and powers up Ice-type moves.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 1.2,
            "boostedTypes": [
                "Ice"
            ],
            "condition": {
                "type": "not-effective",
                "targetTypes": [
                    "Metal",
                    "Fire",
                    "Water",
                    "Ice"
                ]
            }
        }
    },
    {
        "id": "chilling-defense",
        "name": "Chilling Defense",
        "level": null,
        "points": null,
        "type": "Ice",
        "typeImg": "ice.png",
        "description": "Increases resistance to Fire-type moves.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "resistance",
            "resistanceType": "Fire",
            "resistanceAmount": 0.5,
            "target": "self"
        }
    },
    {
        "id": "subzero-shield",
        "name": "Subzero Shield",
        "description": "A defensive stance that increases defense and sp. defense, but decreases sp. attack.",
        "type": "Ice",
        "typeImg": "ice.png",
        "category": "Passive",
        "categoryImg": "passive.png",
        "level": 1,
        "points": 0,
        "effects": [
            {
                "type": "StatChange",
                "stat": "Defense",
                "change": 1.5
            },
            {
                "type": "StatChange",
                "stat": "SpDefense",
                "change": 1.5
            },
            {
                "type": "StatChange",
                "stat": "SpAttack",
                "change": 0.5
            }
        ]
    },
    {
        "id": "frosty-energy",
        "name": "frosty-energy",
        "description": "The user harnesses the power of ice to boost their energy.",
        "type": "Ice",
        "category": "Passive",
        "power": null,
        "accuracy": null,
        "pp": 10,
        "priority": 0,
        "effect": {
            "type": "StatChange",
            "stat": "Energy",
            "change": 1.5
        },
        "target": "Self",
        "typeImg": "ice.png",
        "categoryImg": "passive.png",
        "level": 1,
        "points": 0
    },
    {
        "id": "toxic-boost",
        "name": "Toxic Boost",
        "type": "Poison",
        "category": "Passive",
        "description": "Boosts the power of Poison-type moves.",
        "effect": {
            "type": "MovePower",
            "moveType": "Poison",
            "powerMultiplier": 1.5
        },
        "typeImg": "poison.png",
        "categoryImg": "passive.png",
        "level": 1,
        "points": 0
    },
    {
        "id": "venomous-efficiency",
        "name": "Venomous Efficiency",
        "description": "Reduces the energy cost of all poison-type moves.",
        "type": "Poison",
        "typeImg": "poison.png",
        "categoryImg": "passive.png",
        "category": "Passive",
        "level": 0,
        "points": 0,
        "effect": {
            "type": "StatChange",
            "stat": "Energy",
            "change": -0.2,
            "target": "Self",
            "duration": "Permanent"
        },
        "accuracy": null,
        "power": null,
        "pp": null
    },
    {
        "id": "toxic-overload",
        "name": "Toxic Overload",
        "description": "Boosts the power of Poison-type attacks by 20%, but reduces Sp. Def by 10%.",
        "type": "Poison",
        "typeImg": "poison.png",
        "categoryImg": "passive.png",
        "category": "Passive",
        "level": 1,
        "points": 0,
        "effect": {
            "type": "StatChange",
            "stat": "Sp. Atk",
            "change": 1.2
        },
        "secondaryEffect": {
            "type": "StatChange",
            "stat": "Sp. Def",
            "change": 0.9
        }
    },
    {
        "id": "sludge-slow",
        "name": "Sludge Slow",
        "description": "Uses sludge to reduce the opponent's speed with a chance of X%.",
        "type": "Poison",
        "typeImg": "poison.png",
        "categoryImg": "passive.png",
        "category": "Passive",
        "level": 1,
        "points": 2,
        "effect": {
            "type": "Status",
            "target": "Opponent",
            "status": "SpeedDown",
            "chance": "X%"
        }
    },
    {
        "id": "gas-cloud",
        "name": "Gas Cloud",
        "type": "Poison",
        "typeImg": "poison.png",
        "category": "Passive",
        "categoryImg": "passive.png",
        "description": "The user creates a cloud of gas that reduces the foe's accuracy, making it harder to hit the user.",
        "effects": [
            {
                "type": "StatChange",
                "stat": "Accuracy",
                "change": -0.2,
                "chance": 0.5,
                "target": "Foe"
            }
        ],
        "level": 50,
        "points": 3
    },
    {
        "id": "noxious_armor",
        "name": "Noxious Armor",
        "description": "When the user's HP drops below a certain threshold, their body builds up a resistance to poisons, increasing their defense.",
        "type": "Poison",
        "typeImg": "poison.png",
        "category": "Passive",
        "categoryImg": "passive.png",
        "level": 1,
        "points": 0,
        "effect": {
            "type": "StatChange",
            "stat": "Defense",
            "change": 1.2,
            "condition": {
                "type": "Threshold",
                "hp": 25
            }
        }
    },
    {
        "id": "toxic-touch",
        "name": "Toxic Touch",
        "description": "Increases the chance of poisoning the opponent by x% when they receive a physical attack.",
        "type": "Passive",
        "category": "Poison",
        "categoryImg": "poison.png",
        "effect": {
            "type": "Status",
            "status": "Poison",
            "chance": 1,
            "trigger": "PhysicalAttack"
        },
        "level": 1,
        "points": 0
    },
    {
        "id": "poisonous-speed",
        "name": "Poisonous Speed",
        "description": "Increases the user's speed.",
        "type": "Poison",
        "typeImg": "poison.png",
        "category": "Passive",
        "categoryImg": "passive.png",
        "level": 1,
        "points": 0,
        "effect": {
            "type": "StatChange",
            "stat": "Speed",
            "change": 1.5
        }
    },
    {
        "id": "malicious ",
        "name": "Malicious ",
        "description": "Increases the damage and duration of poison effects for the enemy.",
        "type": "Passive",
        "category": "Poison",
        "categoryImg": "poison.png",
        "effect": {
            "type": "PoisonBoost",
            "change": 1.5
        },
        "level": 50,
        "points": 10
    },
    {
        "id": "swarm",
        "name": "Swarm",
        "level": null,
        "points": null,
        "type": "Bug",
        "typeImg": "bug.png",
        "description": "Increases Bug-type moves power by 20% when the user's HP is below one-third of its maximum.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "power",
            "boostAmount": 20,
            "condition": "when user's HP is below one-third of its maximum",
            "boostedTypes": [
                "Bug"
            ]
        }
    },
    {
        "id": "static",
        "name": "Static",
        "level": null,
        "points": null,
        "type": "Electric",
        "typeImg": "electric.png",
        "description": "Contact with the Pokémon may cause paralysis.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "status",
            "statusType": "paralysis",
            "chance": 30,
            "target": "contact"
        }
    },
    {
        "id": "volt-absorb",
        "name": "Volt Absorb",
        "level": null,
        "points": null,
        "type": "Electric",
        "typeImg": "electric.png",
        "description": "Restores 25% of the user's maximum HP when hit by an Electric-type move.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "heal",
            "healType": "percentMaxHp",
            "healAmount": 25,
            "condition": "when hit by Electric-type move",
            "target": "user"
        }
    },
    {
        "id": "electric-boost",
        "name": "Electric Boost",
        "level": 0,
        "points": 0,
        "type": "Electric",
        "typeImg": "electric.png",
        "description": "This passive move increases the Special Attack of Electric-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "specialAttack",
            "boostAmount": "x",
            "boostedTypes": [
                "Electric"
            ]
        },
        "bonuses": [
            {
                "name": "Electric Boost",
                "bonus": "x% Special Attack Boost to Electric-type Pokémon"
            }
        ]
    },
    {
        "id": "power-plant",
        "name": "Power Plant",
        "level": 0,
        "points": 0,
        "type": "Electric",
        "typeImg": "electric.png",
        "description": "This passive move increases the Special Attack of Electric-type Pokémon by x%.",
        "categoryImg": "passive.png",
        "category": "Passive Move",
        "effect": {
            "type": "boost",
            "boostType": "specialAttack",
            "boostAmount": "x",
            "boostedTypes": [
                "Electric"
            ]
        },
        "bonuses": [
            {
                "name": "Power Plant",
                "bonus": "x% Special Attack Boost to Electric-type Pokémon"
            }
        ]
    }
]

export default abilities;
