/**
 * Player.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    player_id: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    name: {
      type: 'string'
    },

    position: {
      type: 'string'
    },

    overall_rating: {
      type: 'integer'
    },

    team: {
      model: 'team'
    },

    peak_rating: {
      type: 'integer'
    },

    age: {
      type: 'integer'
    },

    injured: {
      type: 'integer'
    },

    salary: {
      type: 'string'
    },

    contract_years: {
      type: 'string'
    },

    war: {
      type: 'string'
    },

    playerid: {
      type: 'string'
    },

    roster: {
      type: 'string'
    },

    bats: {
      type: 'string'
    },

    throws: {
      type: 'string'
    },

    height: {
      type: 'string'
    },

    weight: {
      type: 'string'
    },

    health: {
      type: 'integer'
    },

    happiness: {
      type: 'string'
    },

    upside: {
      type: 'string'
    },

    scouting: {
      type: 'integer'
    },

    contract: {
      type: 'string'
    },

    player_option: {
      type: 'string'
    },

    team_option: {
      type: 'string'
    },

    no_trade: {
      type: 'string'
    },

    seeking: {
      type: 'string'
    },

    interest: {
      type: 'string'
    },

    games: {
      type: 'integer'
    },

    experience: {
      type: 'string'
    },

    mlb_service: {
      type: 'string'
    },

    arbitration: {
      type: 'boolean'
    },

    free_agency: {
      type: 'boolean'
    },

    ab: {
      type: 'integer'
    },

    pa: {
      type: 'integer'
    },

    h: {
      type: 'integer'
    },

    single: {
      type: 'integer'
    },

    double: {
      type: 'integer'
    },

    triple: {
      type: 'integer'
    },

    hr: {
      type: 'integer'
    },

    r: {
      type: 'integer'
    },

    rbi: {
      type: 'integer'
    },

    k: {
      type: 'integer'
    },

    bb: {
      type: 'integer'
    },

    avg: {
      type: 'string'
    },

    obp: {
      type: 'string'
    },

    slg: {
      type: 'string'
    },

    ops: {
      type: 'string'
    },

    risp: {
      type: 'string'
    },

    risp_percentage: {
      type: 'string'
    },

    ibb: {
      type: 'integer'
    },

    hbp: {
      type: 'integer'
    },

    sh: {
      type: 'integer'
    },

    sf: {
      type: 'integer'
    },

    roe: {
      type: 'integer'
    },

    tb: {
      type: 'integer'
    },

    gwrbi: {
      type: 'integer'
    },

    babip: {
      type: 'string'
    },

    hr_percentage: {
      type: 'string'
    },

    k_percentage: {
      type: 'string'
    },

    bb_percentage: {
      type: 'string'
    },

    sb: {
      type: 'integer'
    },

    cs: {
      type: 'integer'
    },

    sb_percentage: {
      type: 'string'
    },

    sr: {
      type: 'string'
    },

    nsr: {
      type: 'string'
    },

    gdp: {
      type: 'integer'
    },

    gdb_percentage: {
      type: 'string'
    },

    rc: {
      type: 'integer'
    },

    rc_per27: {
      type: 'string'
    },

    outs: {
      type: 'integer'
    },

    w_oba: {
      type: 'string'
    },

    w_ave: {
      type: 'string'
    },

    contact: {
      type: 'string'
    },

    power: {
      type: 'string'
    },

    speed: {
      type: 'string'
    },

    eye: {
      type: 'integer'
    },

    bunt: {
      type: 'integer'
    },

    arm: {
      type: 'integer'
    },

    range: {
      type: 'integer'
    },

    fielding: {
      type: 'integer'
    },

    handling: {
      type: 'integer'
    },

    defensive: {
      type: 'integer'
    },

    games_pitched: {
      type: 'integer'
    },

    games_started: {
      type: 'integer'
    },

    wins: {
      type: 'integer'
    },

    loss: {
      type: 'integer'
    },

    percentage: {
      type: 'string'
    },

    era: {
      type: 'string'
    },

    innings_pitched: {
      type: 'integer'
    },

    innings_pitched_per_game: {
      type: 'integer'
    },

    e: {
      type: 'string'
    },

    k_pitcher: {
      type: 'integer'
    },

    bb_pitcher: {
      type: 'integer'
    },

    h_pitcher: {
      type: 'integer'
    },

    doubles_pitcher: {
      type: 'integer'
    },

    triples_pitcher: {
      type: 'integer'
    },

    hr_pitcher: {
      type: 'integer'
    },

    hb_pitcher: {
      type: 'integer'
    },

    wp_pitcher: {
      type: 'integer'
    },

    bk_pitcher: {
      type: 'integer'
    },

    gidp_pitcher: {
      type: 'integer'
    },

    gf_pitcher: {
      type: 'integer'
    },

    sv_pitcher: {
      type: 'integer'
    },

    hd_pitcher: {
      type: 'integer'
    },

    bs_pitcher: {
      type: 'integer'
    },

    sv_percentage_pitcher: {
      type: 'string'
    },

    cg_pitcher: {
      type: 'integer'
    },

    cg_pitcher_percentage: {
      type: 'string'
    },

    qs_pitcher: {
      type: 'integer'
    },

    qs_pitcher_percentage: {
      type: 'string'
    },

    sho_pitcher: {
      type: 'integer'
    },

    bf_pitcher: {
      type: 'integer'
    },

    er_pitcher: {
      type: 'integer'
    },

    r_pitcher: {
      type: 'integer'
    },

    oba_pitcher: {
      type: 'string'
    },

    osa_pitcher: {
      type: 'string'
    },

    ooba_pitcher: {
      type: 'string'
    },

    oops_pitcher: {
      type: 'string'
    },

    babip_pitcher: {
      type: 'string'
    },

    k_9_pitcher: {
      type: 'string'
    },

    bb_9_pitcher: {
      type: 'string'
    },

    h_9_pitcher: {
      type: 'string'
    },

    hr_9_pitcher: {
      type: 'string'
    },

    hb_9_pitcher: {
      type: 'string'
    },

    ratio_pitcher: {
      type: 'string'
    },

    whip_pitcher: {
      type: 'string'
    },

    k_bb_pitcher: {
      type: 'string'
    },

    dice_pitcher: {
      type: 'string'
    },

    gb_percentage_pitcher: {
      type: 'string'
    },

    pitches_pitcher: {
      type: 'integer'
    },

    strikes_pitcher: {
      type: 'integer'
    },

    strike_percentage_pitcher: {
      type: 'string'
    },

    end: {
      type: 'string'
    },

    control: {
      type: 'string'
    },

    power_rating_pitcher: {
      type: 'integer'
    },

    movement: {
      type: 'string'
    },

    hitting: {
      type: 'string'
    },

    mph: {
      type: 'string'
    },

    pitch_1: {
      type: 'string'
    },

    pitch_2: {
      type: 'string'
    },

    pitch_3: {
      type: 'string'
    },

    pitch_4: {
      type: 'string'
    },

    pitch_5: {
      type: 'string'
    },

    pitch_6: {
      type: 'string'
    },

    fielding_percentage: {
      type: 'string'
    },

    range_percentage: {
      type: 'string'
    },

    gs: {
      type: 'integer'
    },

    g: {
      type: 'integer'
    },

    innings: {
      type: 'integer'
    },

    a: {
      type: 'integer'
    },

    po: {
      type: 'integer'
    },

    dp: {
      type: 'integer'
    },

    e_defensive: {
      type: 'integer'
    },

    rf: {
      type: 'string'
    },

    a_g: {
      type: 'string'
    },

    dp_g: {
      type: 'string'
    },

    of_a: {
      type: 'string'
    },

    of_dp: {
      type: 'string'
    },

    pb: {
      type: 'integer'
    },

    sba: {
      type: 'integer'
    },

    sb_9: {
      type: 'string'
    },

    rto: {
      type: 'integer'
    },

    rto_percentage: {
      type: 'string'
    },

    fr: {
      type: 'string'
    },

    fr_27: {
      type: 'string'
    },

    born: {
      type: 'integer'
    },

    draft_year: {
      type: 'integer'
    },

    peak_at_draft: {
      type: 'integer'
    },

    debut_date: {
      type: 'string'
    },

    debut_age: {
      type: 'string'
    },

    retired: {
      type: 'string'
    },

    died: {
      type: 'string'
    },

    inducted: {
      type: 'string'
    },

    votes: {
      type: 'string'
    },

    br: {
      type: 'string'
    },

    bw: {
      type: 'string'
    },

    draa: {
      type: 'string'
    },

    d_150: {
      type: 'string'
    },

    dw: {
      type: 'string'
    },

    pr: {
      type: 'string'
    },

    pw: {
      type: 'string'
    },

    rar: {
      type: 'string'
    }

  },

  map: function (a, res, model) {
    "use strict";
    var self = this;

    var promise = new Promise(function (resolve, reject) {

      var obj = {
        player_id: model.player_id,
        name: model.name,
        position: model.position,
        overall_rating: model.overall_rating,
        team: model.team,
        peak_rating: model.peak_rating,
        age: model.age,
        injured: model.injured,
        salary: model.salary,
        contract_years: model.contract_years,
        war: model.war,
        playerid: model.playerid,
        roster: model.roster,
        bats: model.bats,
        throws: model.throws,
        height: model.height,
        weight: model.weight,
        health: model.health,
        happiness: model.happiness,
        upside: model.upside,
        scouting: model.scouting,
        contract: model.contract,
        player_option: model.player_option,
        team_option: model.team_option,
        no_trade: model.no_trade,
        seeking: model.seeking,
        interest: model.interest,
        games: model.games,
        experience: model.experience,
        mlb_service: model.mlb_service,
        arbitration: model.arbitration,
        free_agency: model.free_agency,
        ab: model.ab,
        pa: model.pa,
        h: model.h,
        single: model.single,
        double: model.double,
        triple: model.triple,
        hr: model.hr,
        r: model.r,
        rbi: model.rbi,
        k: model.k,
        bb: model.bb,
        avg: model.avg,
        obp: model.obp,
        slg: model.slg,
        ops: model.ops,
        risp: model.risp,
        risp_percentage: model.risp_percentage,
        ibb: model.ibb,
        hbp: model.hbp,
        sh: model.sh,
        sf: model.sf,
        roe: model.roe,
        tb: model.tb,
        gwrbi: model.gwrbi,
        babip: model.babip,
        iso: model.iso,
        hr_percentage: model.hr_percentage,
        k_percentage: model.k_percentage,
        bb_percentage: model.bb_percentage,
        sb: model.sb,
        cs: model.cs,
        sb_percentage: model.sb_percentage,
        sr: model.sr,
        nsr: model.nsr,
        gdp: model.gdp,
        gdp_percentage: model.gdp_percentage,
        rc: model.rc,
        rc_per27: model.rc_per27,
        outs: model.outs,
        w_oba: model.w_oba,
        w_ave: model.w_ave,
        contact: model.contact,
        power: model.power,
        speed: model.speed,
        eye: model.eye,
        bunt: model.bunt,
        arm: model.arm,
        range: model.range,
        fielding: model.fielding,
        handling: model.handling,
        defensive: model.defensive,
        games_pitched: model.games_pitched,
        games_started: model.games_started,
        wins: model.wins,
        loss: model.loss,
        percentage: model.percentage,
        era: model.era,
        innings_pitched: model.innings_pitched,
        innings_pitched_per_game: model.innings_pitched_per_game,
        e: model.e,
        k_pitcher: model.k_pitcher,
        bb_pitcher: model.bb_pitcher,
        h_pitcher: model.h_pitcher,
        doubles_pitcher: model.doubles_pitcher,
        triples_pitcher: model.triples_pitcher,
        hr_pitcher: model.hr_pitcher,
        hb_pitcher: model.hb_pitcher,
        wp_pitcher: model.wp_pitcher,
        bk_pitcher: model.bk_pitcher,
        gidp_pitcher: model.gidp_pitcher,
        gf_pitcher: model.gf_pitcher,
        sv_pitcher: model.sv_pitcher,
        hd_pitcher: model.hd_pitcher,
        bs_pitcher: model.bs_pitcher,
        sv_percentage_pitcher: model.sv_percentage_pitcher,
        cg_pitcher: model.cg_pitcher,
        cg_pitcher_percentage: model.cg_pitcher_percentage,
        qs_pitcher: model.qs_pitcher,
        qs_pitcher_percentage: model.qs_pitcher_percentage,
        sho_pitcher: model.sho_pitcher,
        bf_pitcher: model.bf_pitcher,
        er_pitcher: model.er_pitcher,
        r_pitcher: model.r_pitcher,
        oba_pitcher: model.oba_pitcher,
        osa_pitcher: model.osa_pitcher,
        ooba_pitcher: model.ooba_pitcher,
        oops_pitcher: model.oops_pitcher,
        babip_pitcher: model.babip_pitcher,
        k_9_pitcher: model.k_9_pitcher,
        bb_9_pitcher: model.bb_9_pitcher,
        h_9_pitcher: model.h_9_pitcher,
        hr_9_pitcher: model.hr_9_pitcher,
        hb_9_pitcher: model.hb_9_pitcher,
        ratio_pitcher: model.ratio_pitcher,
        whip_pitcher: model.whip_pitcher,
        k_bb_pitcher: model.k_bb_pitcher,
        dice_pitcher: model.dice_pitcher,
        gb_percentage_pitcher: model.gb_percentage_pitcher,
        pitches_pitcher: model.pitches_pitcher,
        strikes_pitcher: model.strikes_pitcher,
        strike_percentage_pitcher: model.strike_percentage_pitcher,
        end: model.end,
        control: model.control,
        power_rating_pitcher: model.power_rating_pitcher,
        movement: model.movement,
        hitting: model.hitting,
        mph: model.mph,
        pitch_1: model.pitch_1,
        pitch_2: model.pitch_2,
        pitch_3: model.pitch_3,
        pitch_4: model.pitch_4,
        pitch_5: model.pitch_5,
        pitch_6: model.pitch_6,
        fielding_percentage: model.fielding_percentage,
        range_percentage: model.range_percentage,
        gs: model.gs,
        g: model.g,
        innings: model.innings,
        a: model.a,
        po: model.po,
        dp: model.dp,
        e_defensive: model.e_defensive,
        rf: model.rf,
        a_g: model.a_g,
        dp_g: model.dp_g,
        of_a: model.of_a,
        of_dp: model.of_dp,
        pb: model.pb,
        sba: model.sba,
        sb_9: model.sb_9,
        rto: model.rto,
        rto_percentage: model.rto_percentage,
        fr: model.fr,
        fr_27: model.fr_27,
        born: model.born,
        draft_year: model.draft_year,
        peak_at_draft: model.peak_at_draft,
        debut_date: model.debut_date,
        debut_age: model.debut_age,
        retired: model.retired,
        died: model.died,
        inducted: model.inducted,
        votes: model.votes,
        br: model.br,
        bw: model.bw,
        draa: model.draa,
        d_150: model.d_150,
        dw: model.dw,
        pr: model.pr,
        pw: model.pw,
        rar: model.rar
      }

      res.model = obj;
      resolve(res);
    });
    return promise;
  },


  load: function (parser) {
    'use strict'

    // startup
    return parser.getPlayers(parser.getDirectoryContentNames("input/players"));
  },

  populate: function (callback, data) {
    "use strict";

    sails.log.info("loading: " + data.model.name);

    Player.create(data.model)
      .then(function (data) {
        "use strict";
        // sails.log.info("found: " + data.name);
        callback();
      })
      .catch(function (error) {
        sails.log.info(error.details);
      });

  }


};

