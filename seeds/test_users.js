
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'パーヴェル チェレンコフ', ruby: 'パーヴェル チェレンコフ', secret: 'KRDCYXLTJROWC5DOFRKGERZTGYWEEXLSIMXXO5ZQNUQWK6SIHNSQ', verified: true, authType: 'totp'},
        {name: 'ミハイル カラシニコフ', ruby: 'ミハイル カラシニコフ', secret: '', verified: true, authType: 'none'},
        {name: 'セルゲイ ラフマニノフ', ruby: 'セルゲイ ラフマニノフ', verified: false, authType: 'totp'},
        {name: 'アントン チェーホフ', ruby: 'アントン チェーホフ', verified: false, authType: 'totp'},
      ]);
    });
};
