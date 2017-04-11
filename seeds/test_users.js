
exports.seed = async function(knex, Promise) {
    // Deletes ALL existing entries
    await knex('users').del();
    await knex('attendance').del();

    await knex('users').insert([
        {name: 'パーヴェル チェレンコフ', ruby: 'パーヴェル チェレンコフ', secret: 'KRDCYXLTJROWC5DOFRKGERZTGYWEEXLSIMXXO5ZQNUQWK6SIHNSQ', verified: true, authType: 'totp'},
        {name: 'ミハイル カラシニコフ', ruby: 'ミハイル カラシニコフ', secret: '', verified: true, authType: 'none'},
        {name: 'セルゲイ ラフマニノフ', ruby: 'セルゲイ ラフマニノフ', verified: false, authType: 'totp'},
        {name: 'アントン チェーホフ', ruby: 'アントン チェーホフ', verified: false, authType: 'totp'},
    ]);

    const {id} = await knex('users').first('id').where('name', '=', 'ミハイル カラシニコフ');
    const year = 10000 * (new Date).getFullYear();
    await knex('attendance').insert([
        {userId: id, date: year + 405, workTime: 765435},
        {userId: id, date: year + 408, workTime: 12765435},
        {userId: id, date: year + 508, workTime: 18765435},
        {userId: id, date: year + 513, workTime: 21765435},
        {userId: id, date: year + 521, workTime: 16765435},
    ])
};
