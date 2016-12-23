/**
 * Created by bryangill on 8/9/16.
 */

var fs = require('fs');
var csv = require('csv-parse/lib/sync')
var fse = require('fs-extra');
var S = require('string');
var US = require("underscore.string");
var async = require('async');
var scores = [];
var participants = [];
var players = [];
var abrv = null;

module.exports = {

  getTeamAbrv: function (filename, line) {

    var promise = new Promise(function (resolve, reject) {

      try {

        if (S(line).collapseWhitespace().contains('ab h')) {

          var team = S(US.strLeft(line, 'ab')).trim().s;


          // Game.find({game_id: filename}).then(function (gameData) {
          //   "use strict";
          //
          //   Team.find({full_name: gameData[0].visiting_team}).then(function (visitingTeamData) {
          //     if (visitingTeamData[0].city.toUpperCase() === team) {
          //       resolve(visitingTeamData[0].short_name);
          //     }
          //   })
          //
          //   // Team.find({full_name: gameData[0].home_team}).then(function (homeTeamData) {
          //   //   if (homeTeamData[0]) {
          //   //     return homeTeamData[0].short_name;
          //   //   }
          //   // })
          //   //
          // });
          // Game.find({game_id: filename}).then(function (data) {
          //   Team.find({full_name: data[0].home_team}).then(function (data) {
          //     return data[0].short_name;
          //   })
          // })
        }
      } catch (error) {
        sails.log.error(error);
      }
    })

    return promise;
  },

  getScores: function (files) {
    "use strict";

    try {

      for (var file of files) {

        var obj = {
          filename: null,
          score: null,
          match_up: null,
          date_of_game: null
        };

        if (S(file).contains('.txt')) {
          obj.filename = S(file).chompRight('.txt').s;
          var lines = fs.readFileSync('input/recaps/' + file).toString().split("\n");
          obj.match_up = S(lines[0]).chompRight('\r').s;
          obj.date_of_game = S(lines[1]).chompRight('\r').s;
          for (var line of lines) {
            if (S(line).contains('WIN:')) {
              obj.score = S(line).chompRight('\r').s;
              scores.push(obj);
            }
          }
        }
      }
    } catch (error) {
      sails.log.error(error);
    }

    return scores;
  },

  getParticipants: function (files) {
    "use strict";

    var self = this;

    try {

      for (var file of files) {

        var filename = null;

        var visiting_team_abrv = null;
        var home_team_abrv = null;

        if (S(file).contains('.txt')) {
          filename = S(file).chompRight('.txt').s;
          var lines = fs.readFileSync('input/boxscores/' + file).toString().split("\n");

          visiting_team_abrv = S(US.strRight(US.strLeft(lines[4], ')'), '(')).trim().s
          home_team_abrv = S(US.strRight(US.strLeft(lines[5], ')'), '(')).trim().s
          var used_visiting_team = false;

          for (var line of lines) {
            if (S(line).collapseWhitespace().contains('ab h')) {
              if (!used_visiting_team) {
                abrv = visiting_team_abrv;
                used_visiting_team = true; // been there once

              } else {
                abrv = home_team_abrv;
              }

            }

            if (S(line).contains('(LF)') ||
              S(line).contains('(CF)') ||
              S(line).contains('(RF)') ||
              S(line).contains('(C)') ||
              S(line).contains('(1B)') ||
              S(line).contains('(2B)') ||
              S(line).contains('(SS)') ||
              S(line).contains('(3B)') ||
              S(line).contains('(DH)')) {
              var obj = {
                team: abrv,
                filename: filename,
                name: null,
                player_id: null
              }
              obj.name = S(US.strLeft(line, '(')).trim().s;
              obj.position = S(US.strRight(US.strLeft(line, ')'), '(')).trim().s;
              obj.player_id = obj.name + obj.team + obj.position;
              participants.push(obj);
            }
          }
        }
      }
    } catch (error) {
      sails.log.error(error);
    }


    return participants;
  },

  getPlayers: function (files) {
    "use strict";

    try {

      var parseOptions = {
        auto_parse: true, // Ensures that numeric values remain numeric
        columns: true,
        delimiter: '\t',
        quote: '',
        relax: false,
        rowDelimiter: '\n', // This is an issue, I had to set the \n here as 'auto' wasn't working, nor was 'windows'.  Maybe look at auto-detecting line endings?
        skip_empty_lines: true,
        trim: true
      }

      for (var file of files) {

        if (S(file).contains('.csv')) {

          var lines = fs.readFileSync('input/players/' + file).toString();
          var records = csv(lines, parseOptions);

          for (var line of records) {

            var obj = {
              player_id: null,
              name: null,
              position: null,
              overall_rating: null,
              team: null,
              peak_rating: null,
              age: null,
              injured: null,
              salary: null,
              contract_years: null,
              war: null,
              playerid: null,
              roster: null,
              bats: null,
              throws: null,
              height: null,
              weight: null,
              health: null,
              happiness: null,
              upside: null,
              scouting: null,
              contract: null,
              player_option: null,
              team_option: null,
              no_trade: null,
              seeking: null,
              interest: null,
              games: null,
              experience: null,
              mlb_service: null,
              arbitration: null,
              free_agency: null,
              ab: null,
              pa: null,
              h: null,
              single: null,
              double: null,
              triple: null,
              hr: null,
              r: null,
              rbi: null,
              k: null,
              bb: null,
              avg: null,
              obp: null,
              slg: null,
              ops: null,
              risp: null,
              risp_percentage: null,
              ibb: null,
              hbp: null,
              sh: null,
              sf: null,
              roe: null,
              tb: null,
              gwrbi: null,
              babip: null,
              iso: null,
              hr_percentage: null,
              k_percentage: null,
              bb_percentage: null,
              sb: null,
              cs: null,
              sb_percentage: null,
              sr: null,
              nsr: null,
              gdp: null,
              gdp_percentage: null,
              rc: null,
              rc_per27: null,
              outs: null,
              w_oba: null,
              w_ave: null,
              contact: null,
              power: null,
              speed: null,
              eye: null,
              bunt: null,
              arm: null,
              range: null,
              fielding: null,
              handling: null,
              defensive: null,
              games_pitched: null,
              games_started: null,
              wins: null,
              loss: null,
              percentage: null,
              era: null,
              innings_pitched: null,
              innings_pitched_per_game: null,
              e: null,
              k_pitcher: null,
              bb_pitcher: null,
              h_pitcher: null,
              doubles_pitcher: null,
              triples_pitcher: null,
              hr_pitcher: null,
              hb_pitcher: null,
              wp_pitcher: null,
              bk_pitcher: null,
              gidp_pitcher: null,
              gf_pitcher: null,
              sv_pitcher: null,
              hd_pitcher: null,
              bs_pitcher: null,
              sv_percentage_pitcher: null,
              cg_pitcher: null,
              cg_pitcher_percentage: null,
              qs_pitcher: null,
              qs_pitcher_percentage: null,
              sho_pitcher: null,
              bf_pitcher: null,
              er_pitcher: null,
              r_pitcher: null,
              oba_pitcher: null,
              osa_pitcher: null,
              ooba_pitcher: null,
              oops_pitcher: null,
              babip_pitcher: null,
              k_9_pitcher: null,
              bb_9_pitcher: null,
              h_9_pitcher: null,
              hr_9_pitcher: null,
              hb_9_pitcher: null,
              ratio_pitcher: null,
              whip_pitcher: null,
              k_bb_pitcher: null,
              dice_pitcher: null,
              gb_percentage_pitcher: null,
              pitches_pitcher: null,
              strikes_pitcher: null,
              strike_percentage_pitcher: null,
              end: null,
              control: null,
              power_rating_pitcher: null,
              movement: null,
              hitting: null,
              mph: null,
              pitch_1: null,
              pitch_2: null,
              pitch_3: null,
              pitch_4: null,
              pitch_5: null,
              pitch_6: null,
              fielding_percentage: null,
              range_percentage: null,
              gs: null,
              g: null,
              innings: null,
              a: null,
              po: null,
              dp: null,
              e_defensive: null,
              rf: null,
              a_g: null,
              dp_g: null,
              of_a: null,
              of_dp: null,
              pb: null,
              sba: null,
              sb_9: null,
              rto: null,
              rto_percentage: null,
              fr: null,
              fr_27: null,
              born: null,
              draft_year: null,
              peak_at_draft: null,
              debut_date: null,
              debut_age: null,
              retired: null,
              died: null,
              inducted: null,
              votes: null,
              br: null,
              bw: null,
              draa: null,
              d_150: null,
              dw: null,
              pr: null,
              pw: null,
              rar: null
            }

            obj.name = line["Player Name"];
            obj.position = line["P"];
            obj.team = line["Team"];
            obj.player_id = obj.name + obj.team + obj.position;
            obj.overall_rating = line["Overall"];
            obj.peak_rating = line["Peak"];
            obj.age = line["Age"];
            obj.injured = line["Injured"];
            obj.salary = line["Salary"];
            obj.contract_years = line["Years"];
            obj.war = line["WAR"];
            obj.playerid = line["PlayerID"];
            obj.roster = line["Roster"];
            obj.bats = line["B"];
            obj.throws = line["T"];
            obj.height = line["Height"];
            obj.weight = line["Weight"];
            obj.health = line["Health"];
            obj.happiness = line["Happiness"];
            obj.upside = line["Upside"];
            obj.scouting = line["Scouting"];
            obj.contract_years = line["Contract"];
            obj.player_option = line["Player Option"];
            obj.team_option = line["Team Option"];
            obj.no_trade = line["No Trade"];
            obj.seeking = line["Seeking"];
            obj.interest = line["Interest"];
            obj.games = line["Games"];
            obj.experience = line["Exp."];
            obj.mlb_service = line["MLB Service"];
            obj.arbitration = line["Arbitration"];
            obj.free_agency = line["Free Agency"];
            obj.ab = line["AB"];
            obj.pa = line["PA"];
            obj.h = line["H"];
            obj.single = line["1B"];
            obj.double = line["2B"];
            obj.triple = line["3B"];
            obj.hr = line["HR"];
            obj.r = line["R"];
            obj.rbi = line["RBI"];
            obj.k = line["K"];
            obj.bb = line["BB"];
            obj.avg = line["Avg"];
            obj.obp = line["OBP"];
            obj.slg = line["SLG"];
            obj.ops = line["OPS"];
            obj.risp = line["RISP"];
            obj.risp_percentage = line["RISP%"];
            obj.ibb = line["IBB"];
            obj.hbp = line["HBP"];
            obj.sh = line["SH"];
            obj.sf = line["SF"];
            obj.roe = line["ROE"];
            obj.tb = line["TB"];
            obj.gwrbi = line["GWRBI"];
            obj.babip = line["BABIP"];
            obj.iso = line["ISO"];
            obj.hr_percentage = line["HR%"];
            obj.k_percentage = line["K%"];
            obj.bb_percentage = line["BB%"];
            obj.sb = line["SB"];
            obj.cs = line["CS"];
            obj.sb_percentage = line["SB%"];
            obj.sr = line["SR"];
            obj.nsr = line["NSR"];
            obj.gdp = line["GDP"];
            obj.gdp_percentage = line["GDP%"];
            obj.rc = line["RC"];
            obj.rc_per27 = line["RC/27"];
            obj.outs = line["Outs"];
            obj.w_oba = line["wOBA"];
            obj.w_ave = line["wAVG"];
            obj.contact = line["Con"];
            obj.power = line["Pow"];
            obj.speed = line["Spd"];
            obj.eye = line["Eye"];
            obj.bunt = line["Bunt"];
            obj.arm = line["Arm"];
            obj.range = line["Rng"];
            obj.fielding = line["Fld"];
            obj.handling = line["Han"];
            obj.defensive = line["Def"];
            obj.games_pitched = line["G"];
            obj.games_started = line["GS"];
            obj.wins = line["W"];
            obj.loss = line["L"];
            obj.percentage = line["Pct."];
            obj.era = line["ERA"];
            obj.innings_pitched = line["IP"];
            obj.innings_pitched_per_game = line["IP/G"];
            // obj.e = line["HB"];
            // obj.k_pitcher = line["WP"];
            // obj.bb_pitcher = line["BK"];
            // obj.h_pitcher = line["PK"];
            // obj.doubles_pitcher = line["GIDP"];
            // obj.triples_pitcher = line["GF"];
            // obj.hr_pitcher = line["SV"];
            obj.hb_pitcher = line["HB"];
            obj.wp_pitcher = line["WP"];
            obj.bk_pitcher = line["BK"];
            // obj.pk_pitcher = line["PK"]; // may need to add
            obj.gidp_pitcher = line["GIDP"];
            obj.gf_pitcher = line["GF"];
            obj.sv_pitcher = line["SV"];
            obj.hd_pitcher = line["HD"];
            obj.bs_pitcher = line["BS"];
            obj.sv_percentage_pitcher = line["SV%"];
            obj.cg_pitcher = line["CG"];
            obj.cg_pitcher_percentage = line["CG%"];
            obj.qs_pitcher = line["QS"];
            obj.qs_pitcher_percentage = line["QS%"];
            obj.sho_pitcher = line["SHO"];
            obj.bf_pitcher = line["BF"];
            obj.er_pitcher = line["ER"];
            // obj.r_pitcher = line["AB"];
            obj.oba_pitcher = line["OBA"];
            obj.osa_pitcher = line["OSA"];
            obj.ooba_pitcher = line["OOBA"];
            obj.oops_pitcher = line["OOPS"];
            // obj.babip_pitcher = line["AB"];
            obj.k_9_pitcher = line["K/9"];
            obj.bb_9_pitcher = line["BB/9"];
            obj.h_9_pitcher = line["H/9"];
            obj.hr_9_pitcher = line["HR/9"];
            obj.hb_9_pitcher = line["HB/9"];
            obj.ratio_pitcher = line["Ratio"];
            obj.whip_pitcher = line["WHIP"];
            obj.k_bb_pitcher = line["K/BB"];
            obj.dice_pitcher = line["DICE"];
            obj.gb_percentage_pitcher = line["GB%"];
            obj.pitches_pitcher = line["Pitches"];
            obj.strikes_pitcher = line["Strikes"];
            obj.strike_percentage_pitcher = line["Strike%"];
            obj.end = line["End"];
            obj.control = line["Mov"];
            // obj.power_rating_pitcher = line["Hit"];
            obj.movement = line["Mov"];
            obj.hitting = line["Hit"];
            obj.mph = line["MPH"];
            obj.pitch_1 = line["#1 Pitch"];
            obj.pitch_2 = line["#2 Pitch"];
            obj.pitch_3 = line["#3 Pitch"];
            obj.pitch_4 = line["#4 Pitch"];
            obj.pitch_5 = line["#5 Pitch"];
            obj.pitch_6 = line["#6 Pitch"];
            obj.fielding_percentage = line["Fldg%"];
            obj.range_percentage = line["Range"];
            // obj.gs = line["AB"];
            // obj.g = line["AB"];
            obj.innings = line["Inn"];
            obj.a = line["A"];
            obj.po = line["PO"];
            obj.dp = line["DP"];
            obj.e_defensive = line["E"];
            obj.rf = line["RF"];
            obj.a_g = line["A/G"];
            obj.dp_g = line["DP/G"];
            obj.of_a = line["A (OF)"];
            obj.of_dp = line["DP (OF)"];
            obj.pb = line["PB"];
            obj.sba = line["SBA"];
            obj.sb_9 = line["SB/9"];
            obj.rto = line["RTO"];
            obj.rto_percentage = line["RTO%"];
            obj.fr = line["FR"];
            obj.fr_27 = line["FR/27"];
            obj.born = line["Born"];
            obj.draft_year = line["Draft Year"];
            obj.peak_at_draft = line["Peak @ Draft"];
            obj.debut_date = line["Debut Date"];
            obj.debut_age = line["Debut Age"];
            obj.retired = line["Retired"];
            obj.died = line["Died"];
            obj.inducted = line["Inducted"];
            obj.votes = line["Votes"];
            obj.br = line["BR"];
            obj.bw = line["BW"];
            obj.draa = line["DRAA"];
            obj.d_150 = line["D/150"];
            obj.dw = line["DW"];
            obj.pr = line["PR"];
            obj.pw = line["PW"];
            obj.rar = line["RAR"];

            players.push(obj);

          }
        }
      }
    } catch (error) {
      sails.log.error(error);
    }

    return players;
  },

  getDirectoryContentNames: function (path) {

    "use strict";

    try {
      return fs.readdirSync(path);
    } catch (error) {
      sails.log.error(error);
    }

  },

  moveDirectoryContent: function (callback, from, to) {

    "use strict";

    try {
      sails.log.info("moving directory content")
      fse.copySync(from, to);
      sails.log.info("completed moving directory content")
      this.removeDirectoryContent(from);
      callback();
    } catch (err) {
      sails.log.error('error moving directory content: ' + err);
    }
  },

  removeDirectoryContent: function (from) {
    "use strict";

    sails.log.info("beginning to remove contents from directory...");
    try {
      sails.log.info("removing contents from directory...");
      fse.removeSync(from + '/boxscores' + '/*.txt');
      fse.removeSync(from + '/recaps' + '/*.txt');
      fse.removeSync(from + '/players' + '/*.csv');
      sails.log.info("completed removing contents from directory");
    } catch (err) {
      sails.log.error('error removing contents from directory: ' + err);
    }
  },

};
