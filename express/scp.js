const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function minta_semua(url){
    try{
        const response = await axios.get(url, { httpsAgent: agent });
        var $ = cheerio.load(response.data);
        var ul = $('ul.clstyle'); 
        var all_chp = [];
        ul.find('li').each(function(i, elm){
            var al = $(this).find("a").attr('href');
            var aal = al.split("/");
            var chp = {
                    judul: $(this).find("span.chapternum").text(),
                    date: $(this).find("span.chapterdate").text(),
                    link: al,
                    token: aal[3]
                    };
            //console.log(chp);
            all_chp.push(chp);
        });
        return await all_chp;
    }catch(error){
        console.log(error);
    }
}

async function minta_gambar(url){
    try{
        const response = await axios.get(url, { httpsAgent: agent });
        let data = response.data;
        const regex = /\<script>ts_reader\.run\((.*?)\)\;<\/script\>/s;
        let m;

        if ((m = regex.exec(data)) !== null) {
            
            var res = JSON.parse(m[1]);
            var imgs = res['sources'][0]['images'];
            //console.log(imgs);
            return await imgs;
        }
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    minta_semua, minta_gambar
}