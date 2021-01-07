const DICTS = {
  // 性别
  cus_gender: [
    { text2: "0-未知的性别", text: "未知的性别", value: "0" },
    { text2: "1-男性", text: "男性", value: "1" },
    { text2: "2-1女性", text: "1女性", value: "2" },
    { text2: "9-未说明的性别", text: "未说明的性别", value: "9" }
  ],

  cus_notarType: [
    { text2: "GZ_CK-存款公证", text: "存款公证", value: "GZ_CK" },
    { text2: "GZ_JCQ-继承权公证", text: "继承权公证", value: "GZ_JCQ" },
    { text2: "GZ_JCSY-解除收养公证", text: "解除收养公证", value: "GZ_JCSY" },
    { text2: "GZ_JH-结婚公证", text: "结婚公证", value: "GZ_JH" },
    { text2: "GZ_JK-借款合同公证", text: "借款合同公证", value: "GZ_JK" },
    { text2: "GZ_LH-离婚公证", text: "离婚公证", value: "GZ_LH" },
    { text2: "GZ_QS-亲属关系公证", text: "亲属关系公证", value: "GZ_QS" },
    { text2: "GZ_SW-死亡公证", text: "死亡公证", value: "GZ_SW" },
    { text2: "GZ_SY-收养公证", text: "收养公证", value: "GZ_SY" },
    { text2: "GZ_YZ-遗嘱公证", text: "遗嘱公证", value: "GZ_YZ" }
  ],
  // 民族
  cus_nation: [
    { text2: "01-汉族", text: "汉族", value: "01" },
    { text2: "02-蒙古族", text: "蒙古族", value: "02" },
    { text2: "03-回族", text: "回族", value: "03" },
    { text2: "04-藏族", text: "藏族", value: "04" },
    { text2: "05-维吾尔族", text: "维吾尔族", value: "05" },
    { text2: "06-苗族", text: "苗族", value: "06" },
    { text2: "07-彝族", text: "彝族", value: "07" },
    { text2: "08-壮族", text: "壮族", value: "08" },
    { text2: "09-布依族", text: "布依族", value: "09" },
    { text2: "10-朝鲜族", text: "朝鲜族", value: "10" },
    { text2: "11-满族", text: "满族", value: "11" },
    { text2: "12-侗族", text: "侗族", value: "12" },
    { text2: "13-瑶族", text: "瑶族", value: "13" },
    { text2: "14-白族", text: "白族", value: "14" },
    { text2: "15-土家族", text: "土家族", value: "15" },
    { text2: "16-哈尼族", text: "哈尼族", value: "16" },
    { text2: "17-哈萨克族", text: "哈萨克族", value: "17" },
    { text2: "18-傣族", text: "傣族", value: "18" },
    { text2: "19-黎族", text: "黎族", value: "19" },
    { text2: "20-傈僳族", text: "傈僳族", value: "20" },
    { text2: "21-佤族", text: "佤族", value: "21" },
    { text2: "22-畲族", text: "畲族", value: "22" },
    { text2: "23-高山族", text: "高山族", value: "23" },
    { text2: "24-拉祜族", text: "拉祜族", value: "24" },
    { text2: "25-水族", text: "水族", value: "25" },
    { text2: "26-东乡族", text: "东乡族", value: "26" },
    { text2: "27-纳西族", text: "纳西族", value: "27" },
    { text2: "28-景颇族", text: "景颇族", value: "28" },
    { text2: "29-柯尔克孜族", text: "柯尔克孜族", value: "29" },
    { text2: "30-土族", text: "土族", value: "30" },
    { text2: "31-达斡尔族", text: "达斡尔族", value: "31" },
    { text2: "32-仫佬族", text: "仫佬族", value: "32" },
    { text2: "33-羌族", text: "羌族", value: "33" },
    { text2: "34-布朗族", text: "布朗族", value: "34" },
    { text2: "35-撒拉族", text: "撒拉族", value: "35" },
    { text2: "36-毛南族", text: "毛南族", value: "36" },
    { text2: "37-仡佬族", text: "仡佬族", value: "37" },
    { text2: "38-锡伯族", text: "锡伯族", value: "38" },
    { text2: "39-阿昌族", text: "阿昌族", value: "39" },
    { text2: "40-普米族", text: "普米族", value: "40" },
    { text2: "41-塔吉克族", text: "塔吉克族", value: "41" },
    { text2: "42-怒族", text: "怒族", value: "42" },
    { text2: "43-乌孜别克族", text: "乌孜别克族", value: "43" },
    { text2: "44-俄罗斯族", text: "俄罗斯族", value: "44" },
    { text2: "45-鄂温克族", text: "鄂温克族", value: "45" },
    { text2: "46-德昂族", text: "德昂族", value: "46" },
    { text2: "47-保安族", text: "保安族", value: "47" },
    { text2: "48-裕固族", text: "裕固族", value: "48" },
    { text2: "49-京族", text: "京族", value: "49" },
    { text2: "50-塔塔尔族", text: "塔塔尔族", value: "50" },
    { text2: "51-独龙族", text: "独龙族", value: "51" },
    { text2: "52-鄂伦春族", text: "鄂伦春族", value: "52" },
    { text2: "53-赫哲族", text: "赫哲族", value: "53" },
    { text2: "54-门巴族", text: "门巴族", value: "54" },
    { text2: "55-珞巴族", text: "珞巴族", value: "55" },
    { text2: "56-基诺族", text: "基诺族", value: "56" },
    { text2: "57-其它", text: "其它", value: "57" },
    { text2: "58-外国血统中国籍人士", text: "外国血统中国籍人士", value: "58" }
  ],
  //职业
  cus_occupation: [
    {
      text2: "00000-国家机关、党群组织、企业、事业单位负责人",
      text: "国家机关、党群组织、企业、事业单位负责人",
      value: "00000"
    },
    {
      text2: "20000-办事人员和有关人员",
      text: "办事人员和有关人员",
      value: "20000"
    },
    {
      text2: "30000-商业、服务业人员",
      text: "商业、服务业人员",
      value: "30000"
    },
    {
      text2: "40000-农、林、牧、渔、水利业生产人员",
      text: "农、林、牧、渔、水利业生产人员",
      value: "40000"
    },
    {
      text2: "50000-生产、运输设备操作人员及有关人员",
      text: "生产、运输设备操作人员及有关人员",
      value: "50000"
    },
    { text2: "99999-无职业", text: "无职业", value: "99999" },
    { text2: "X0000-军人", text: "军人", value: "X0000" },
    {
      text2: "Y0000-不便分类的其他从业人员",
      text: "不便分类的其他从业人员",
      value: "Y0000"
    }
  ],
  // 是否面签
  cus_yesOrNo: [
    { text2: "0-否", text: "否", value: "0" },
    { text2: "1-是", text: "是", value: "1" }
  ],

  // 国籍
  cus_country: [
    { text2: "ABW-阿鲁巴", text: "阿鲁巴", value: "ABW" },
    { text2: "AFG-阿富汗", text: "阿富汗", value: "AFG" },
    { text2: "AGO-安哥拉共和国", text: "安哥拉共和国", value: "AGO" },
    { text2: "AIA-安圭拉", text: "安圭拉", value: "AIA" },
    { text2: "ALB-阿尔巴尼亚共和国", text: "阿尔巴尼亚共和国", value: "ALB" },
    { text2: "AND-安道尔公国", text: "安道尔公国", value: "AND" },
    { text2: "ANT-荷属安的列斯", text: "荷属安的列斯", value: "ANT" },
    { text2: "ARE-阿拉伯联合酋长国", text: "阿拉伯联合酋长国", value: "ARE" },
    { text2: "ARG-阿根廷共和国", text: "阿根廷共和国", value: "ARG" },
    { text2: "ARM-亚美尼亚共和国", text: "亚美尼亚共和国", value: "ARM" },
    { text2: "ASM-美属萨摩亚", text: "美属萨摩亚", value: "ASM" },
    { text2: "ATA-南极洲", text: "南极洲", value: "ATA" },
    { text2: "ATF-法属南部领地", text: "法属南部领地", value: "ATF" },
    { text2: "ATG-安提瓜和巴布达", text: "安提瓜和巴布达", value: "ATG" },
    { text2: "AUS-澳大利亚联邦", text: "澳大利亚联邦", value: "AUS" },
    { text2: "AUT-奥地利共和国", text: "奥地利共和国", value: "AUT" },
    { text2: "AZE-阿塞拜疆共和国", text: "阿塞拜疆共和国", value: "AZE" },
    { text2: "BDI-布隆迪共和国", text: "布隆迪共和国", value: "BDI" },
    { text2: "BEL-比利时王国", text: "比利时王国", value: "BEL" },
    { text2: "BEN-贝宁共和国", text: "贝宁共和国", value: "BEN" },
    { text2: "BFA-布基纳法索", text: "布基纳法索", value: "BFA" },
    { text2: "BGD-孟加拉人民共和国", text: "孟加拉人民共和国", value: "BGD" },
    { text2: "BGR-保加利亚共和国", text: "保加利亚共和国", value: "BGR" },
    { text2: "BHR-巴林国", text: "巴林国", value: "BHR" },
    { text2: "BHS-巴哈马联邦", text: "巴哈马联邦", value: "BHS" },
    {
      text2: "BIH-波斯尼亚和黑塞哥维那",
      text: "波斯尼亚和黑塞哥维那",
      value: "BIH"
    },
    { text2: "BLR-白俄罗斯共和国", text: "白俄罗斯共和国", value: "BLR" },
    { text2: "BLZ-伯利兹", text: "伯利兹", value: "BLZ" },
    { text2: "BMU-百慕大", text: "百慕大", value: "BMU" },
    { text2: "BOL-玻利维亚共和国", text: "玻利维亚共和国", value: "BOL" },
    { text2: "BRA-巴西联邦共和国", text: "巴西联邦共和国", value: "BRA" },
    { text2: "BRB-巴巴多斯", text: "巴巴多斯", value: "BRB" },
    { text2: "BRN-文莱达鲁萨兰国", text: "文莱达鲁萨兰国", value: "BRN" },
    { text2: "BTN-不丹王国", text: "不丹王国", value: "BTN" },
    { text2: "BVT-布维岛", text: "布维岛", value: "BVT" },
    { text2: "BWA-博茨瓦纳共和国", text: "博茨瓦纳共和国", value: "BWA" },
    { text2: "CAF-中非共和国", text: "中非共和国", value: "CAF" },
    { text2: "CAN-加拿大", text: "加拿大", value: "CAN" },
    { text2: "CCK-科科斯(基林)群岛", text: "科科斯(基林)群岛", value: "CCK" },
    { text2: "CHE-瑞士联邦", text: "瑞士联邦", value: "CHE" },
    { text2: "CHL-智利共和国", text: "智利共和国", value: "CHL" },
    { text2: "CHN-中华人民共和国", text: "中华人民共和国", value: "CHN" },
    { text2: "CIV-科特迪瓦共和国", text: "科特迪瓦共和国", value: "CIV" },
    { text2: "CMR-喀麦隆共和国", text: "喀麦隆共和国", value: "CMR" },
    { text2: "COD-刚果民主共和国", text: "刚果民主共和国", value: "COD" },
    { text2: "COG-刚果共和国", text: "刚果共和国", value: "COG" },
    { text2: "COK-库克群岛", text: "库克群岛", value: "COK" },
    { text2: "COL-哥伦比亚共和国", text: "哥伦比亚共和国", value: "COL" },
    {
      text2: "COM-科摩罗伊斯兰联邦共和国",
      text: "科摩罗伊斯兰联邦共和国",
      value: "COM"
    },
    { text2: "CPV-佛得角共和国", text: "佛得角共和国", value: "CPV" },
    { text2: "CRI-哥斯达黎加共和国", text: "哥斯达黎加共和国", value: "CRI" },
    { text2: "CUB-古巴共和国", text: "古巴共和国", value: "CUB" },
    { text2: "CXR-圣诞岛", text: "圣诞岛", value: "CXR" },
    { text2: "CYM-开曼群岛", text: "开曼群岛", value: "CYM" },
    { text2: "CYP-塞浦路斯共和国", text: "塞浦路斯共和国", value: "CYP" },
    { text2: "CZE-捷克共和国", text: "捷克共和国", value: "CZE" },
    { text2: "DEU-德意志联邦共和国", text: "德意志联邦共和国", value: "DEU" },
    { text2: "DJI-吉布提共和国", text: "吉布提共和国", value: "DJI" },
    { text2: "DMA-多米尼克国", text: "多米尼克国", value: "DMA" },
    { text2: "DNK-丹麦王国", text: "丹麦王国", value: "DNK" },
    { text2: "DOM-多米尼加共和国", text: "多米尼加共和国", value: "DOM" },
    {
      text2: "DZA-阿尔及利亚民主人民共和国",
      text: "阿尔及利亚民主人民共和国",
      value: "DZA"
    },
    { text2: "ECU-厄瓜多尔共和国", text: "厄瓜多尔共和国", value: "ECU" },
    { text2: "EGY-阿拉伯埃及共和国", text: "阿拉伯埃及共和国", value: "EGY" },
    { text2: "ERI-厄立特里亚国", text: "厄立特里亚国", value: "ERI" },
    { text2: "ESH-西撒哈拉", text: "西撒哈拉", value: "ESH" },
    { text2: "ESP-西班牙王国", text: "西班牙王国", value: "ESP" },
    { text2: "EST-爱沙尼亚共和国", text: "爱沙尼亚共和国", value: "EST" },
    {
      text2: "ETH-埃塞俄比亚联邦民主共和国",
      text: "埃塞俄比亚联邦民主共和国",
      value: "ETH"
    },
    { text2: "FIN-芬兰共和国", text: "芬兰共和国", value: "FIN" },
    { text2: "FJI-斐济群岛共和国", text: "斐济群岛共和国", value: "FJI" },
    {
      text2: "FLK-福克兰群岛(马尔维纳斯群岛)",
      text: "福克兰群岛(马尔维纳斯群岛)",
      value: "FLK"
    },
    { text2: "FRA-法兰西共和国", text: "法兰西共和国", value: "FRA" },
    { text2: "FRO-法罗群岛", text: "法罗群岛", value: "FRO" },
    { text2: "FSM-密克罗尼西亚联邦", text: "密克罗尼西亚联邦", value: "FSM" },
    { text2: "GAB-加蓬共和国", text: "加蓬共和国", value: "GAB" },
    {
      text2: "GBR-大不列颠及北爱尔兰联合王国",
      text: "大不列颠及北爱尔兰联合王国",
      value: "GBR"
    },
    { text2: "GEO-格鲁吉亚", text: "格鲁吉亚", value: "GEO" },
    { text2: "GHA-加纳共和国", text: "加纳共和国", value: "GHA" },
    { text2: "GIB-直布罗陀", text: "直布罗陀", value: "GIB" },
    { text2: "GIN-几内亚共和国", text: "几内亚共和国", value: "GIN" },
    { text2: "GLP-瓜德罗普", text: "瓜德罗普", value: "GLP" },
    { text2: "GMB-冈比亚共和国", text: "冈比亚共和国", value: "GMB" },
    { text2: "GNB-几内亚比绍共和国", text: "几内亚比绍共和国", value: "GNB" },
    { text2: "GNQ-赤道几内亚共和国", text: "赤道几内亚共和国", value: "GNQ" },
    { text2: "GRC-希腊共和国", text: "希腊共和国", value: "GRC" },
    { text2: "GRD-格林纳达", text: "格林纳达", value: "GRD" },
    { text2: "GRL-格陵兰", text: "格陵兰", value: "GRL" },
    { text2: "GTM-危地马拉共和国", text: "危地马拉共和国", value: "GTM" },
    { text2: "GUF-法属圭亚那", text: "法属圭亚那", value: "GUF" },
    { text2: "GUM-关岛", text: "关岛", value: "GUM" },
    { text2: "GUY-圭亚那合作共和国", text: "圭亚那合作共和国", value: "GUY" },
    {
      text2: "HKG-中国香港特别行政区",
      text: "中国香港特别行政区",
      value: "HKG"
    },
    {
      text2: "HMD-赫德岛和麦克唐纳岛",
      text: "赫德岛和麦克唐纳岛",
      value: "HMD"
    },
    { text2: "HND-洪都拉斯共和国", text: "洪都拉斯共和国", value: "HND" },
    { text2: "HRV-克罗地亚共和国", text: "克罗地亚共和国", value: "HRV" },
    { text2: "HTI-海地共和国", text: "海地共和国", value: "HTI" },
    { text2: "HUN-匈牙利共和国", text: "匈牙利共和国", value: "HUN" },
    { text2: "IDN-印度尼西亚共和国", text: "印度尼西亚共和国", value: "IDN" },
    { text2: "IND-印度共和国", text: "印度共和国", value: "IND" },
    { text2: "IOT-英属印度洋领地", text: "英属印度洋领地", value: "IOT" },
    { text2: "IRL-爱尔兰", text: "爱尔兰", value: "IRL" },
    { text2: "IRN-伊朗伊斯兰共和国", text: "伊朗伊斯兰共和国", value: "IRN" },
    { text2: "IRQ-伊拉克共和国", text: "伊拉克共和国", value: "IRQ" },
    { text2: "ISL-冰岛共和国", text: "冰岛共和国", value: "ISL" },
    { text2: "ISR-以色列国", text: "以色列国", value: "ISR" },
    { text2: "ITA-意大利共和国", text: "意大利共和国", value: "ITA" },
    { text2: "JAM-牙买加", text: "牙买加", value: "JAM" },
    { text2: "JOR-约旦哈希姆王国", text: "约旦哈希姆王国", value: "JOR" },
    { text2: "JPN-日本国", text: "日本国", value: "JPN" },
    { text2: "KAZ-哈萨克斯坦共和国", text: "哈萨克斯坦共和国", value: "KAZ" },
    { text2: "KEN-肯尼亚共和国", text: "肯尼亚共和国", value: "KEN" },
    { text2: "KGZ-吉尔吉斯共和国", text: "吉尔吉斯共和国", value: "KGZ" },
    { text2: "KHM-柬埔寨王国", text: "柬埔寨王国", value: "KHM" },
    { text2: "KIR-基里巴斯共和国", text: "基里巴斯共和国", value: "KIR" },
    {
      text2: "KNA-圣基茨和尼维斯联邦",
      text: "圣基茨和尼维斯联邦",
      value: "KNA"
    },
    { text2: "KOR-大韩民国", text: "大韩民国", value: "KOR" },
    { text2: "KWT-科威特国", text: "科威特国", value: "KWT" },
    {
      text2: "LAO-老挝人民民主共和国",
      text: "老挝人民民主共和国",
      value: "LAO"
    },
    { text2: "LBN-黎巴嫩共和国", text: "黎巴嫩共和国", value: "LBN" },
    { text2: "LBR-利比里亚共和国", text: "利比里亚共和国", value: "LBR" },
    {
      text2: "LBY-大阿拉伯利比亚人民社会主义民众国",
      text: "大阿拉伯利比亚人民社会主义民众国",
      value: "LBY"
    },
    { text2: "LCA-圣卢西亚", text: "圣卢西亚", value: "LCA" },
    { text2: "LIE-列支敦士登公国", text: "列支敦士登公国", value: "LIE" },
    {
      text2: "LKA-斯里兰卡民主社会主义共和国",
      text: "斯里兰卡民主社会主义共和国",
      value: "LKA"
    },
    { text2: "LSO-莱索托王国", text: "莱索托王国", value: "LSO" },
    { text2: "LTU-立陶宛共和国", text: "立陶宛共和国", value: "LTU" },
    { text2: "LUX-卢森堡大公国", text: "卢森堡大公国", value: "LUX" },
    { text2: "LVA-拉脱维亚共和国", text: "拉脱维亚共和国", value: "LVA" },
    {
      text2: "MAC-中国澳门特别行政区",
      text: "中国澳门特别行政区",
      value: "MAC"
    },
    { text2: "MAR-摩洛哥王国", text: "摩洛哥王国", value: "MAR" },
    { text2: "MCO-摩纳哥公国", text: "摩纳哥公国", value: "MCO" },
    { text2: "MDA-摩尔多瓦共和国", text: "摩尔多瓦共和国", value: "MDA" },
    { text2: "MDG-马达加斯加共和国", text: "马达加斯加共和国", value: "MDG" },
    { text2: "MDV-马尔代夫共和国", text: "马尔代夫共和国", value: "MDV" },
    { text2: "MEX-墨西哥合众国", text: "墨西哥合众国", value: "MEX" },
    { text2: "MHL-马绍尔群岛共和国", text: "马绍尔群岛共和国", value: "MHL" },
    {
      text2: "MKD-前南斯拉夫马其顿共和国",
      text: "前南斯拉夫马其顿共和国",
      value: "MKD"
    },
    { text2: "MLI-马里共和国", text: "马里共和国", value: "MLI" },
    { text2: "MLT-马耳他共和国", text: "马耳他共和国", value: "MLT" },
    { text2: "MMR-缅甸联邦", text: "缅甸联邦", value: "MMR" },
    { text2: "MNE-黑山", text: "黑山", value: "MNE" },
    { text2: "MNG-蒙古国", text: "蒙古国", value: "MNG" },
    {
      text2: "MNP-北马里亚纳自由联邦",
      text: "北马里亚纳自由联邦",
      value: "MNP"
    },
    { text2: "MOZ-莫桑比克共和国", text: "莫桑比克共和国", value: "MOZ" },
    {
      text2: "MRT-毛里塔尼亚伊斯兰共和国",
      text: "毛里塔尼亚伊斯兰共和国",
      value: "MRT"
    },
    { text2: "MSR-蒙特塞拉特", text: "蒙特塞拉特", value: "MSR" },
    { text2: "MTQ-马提尼克", text: "马提尼克", value: "MTQ" },
    { text2: "MUS-毛里求斯共和国", text: "毛里求斯共和国", value: "MUS" },
    { text2: "MWI-马拉维共和国", text: "马拉维共和国", value: "MWI" },
    { text2: "MYS-马来西亚", text: "马来西亚", value: "MYS" },
    { text2: "MYT-马约特", text: "马约特", value: "MYT" },
    { text2: "NAM-纳米比亚共和国", text: "纳米比亚共和国", value: "NAM" },
    { text2: "NCL-新喀里多尼亚", text: "新喀里多尼亚", value: "NCL" },
    { text2: "NER-尼日尔共和国", text: "尼日尔共和国", value: "NER" },
    { text2: "NFK-诺福克岛", text: "诺福克岛", value: "NFK" },
    {
      text2: "NGA-尼日利亚联邦共和国",
      text: "尼日利亚联邦共和国",
      value: "NGA"
    },
    { text2: "NIC-尼加拉瓜共和国", text: "尼加拉瓜共和国", value: "NIC" },
    { text2: "NIU-纽埃", text: "纽埃", value: "NIU" },
    { text2: "NLD-荷兰王国", text: "荷兰王国", value: "NLD" },
    { text2: "NOR-挪威王国", text: "挪威王国", value: "NOR" },
    { text2: "NPL-尼泊尔王国", text: "尼泊尔王国", value: "NPL" },
    { text2: "NRU-瑙鲁共和国", text: "瑙鲁共和国", value: "NRU" },
    { text2: "NZL-新西兰", text: "新西兰", value: "NZL" },
    { text2: "OMN-阿曼苏丹国", text: "阿曼苏丹国", value: "OMN" },
    {
      text2: "PAK-巴基斯坦伊斯兰共和国",
      text: "巴基斯坦伊斯兰共和国",
      value: "PAK"
    },
    { text2: "PAN-巴拿马共和国", text: "巴拿马共和国", value: "PAN" },
    { text2: "PCN-皮特凯恩", text: "皮特凯恩", value: "PCN" },
    { text2: "PER-秘鲁共和国", text: "秘鲁共和国", value: "PER" },
    { text2: "PHL-菲律宾共和国", text: "菲律宾共和国", value: "PHL" },
    { text2: "PLW-帕劳共和国", text: "帕劳共和国", value: "PLW" },
    {
      text2: "PNG-巴布亚新几内亚独立国",
      text: "巴布亚新几内亚独立国",
      value: "PNG"
    },
    { text2: "POL-波兰共和国", text: "波兰共和国", value: "POL" },
    { text2: "PRI-波多黎各自由联邦", text: "波多黎各自由联邦", value: "PRI" },
    {
      text2: "PRK-朝鲜民主主义人民共和国",
      text: "朝鲜民主主义人民共和国",
      value: "PRK"
    },
    { text2: "PRT-葡萄牙共和国", text: "葡萄牙共和国", value: "PRT" },
    { text2: "PRY-巴拉圭共和国", text: "巴拉圭共和国", value: "PRY" },
    { text2: "PSE-巴勒斯坦国", text: "巴勒斯坦国", value: "PSE" },
    { text2: "PYF-法属波利尼西亚", text: "法属波利尼西亚", value: "PYF" },
    { text2: "QAT-卡塔尔国", text: "卡塔尔国", value: "QAT" },
    { text2: "REU-留尼汪", text: "留尼汪", value: "REU" },
    { text2: "ROM-罗马尼亚", text: "罗马尼亚", value: "ROM" },
    { text2: "RUS-俄罗斯联邦", text: "俄罗斯联邦", value: "RUS" },
    { text2: "RWA-卢旺达共和国", text: "卢旺达共和国", value: "RWA" },
    { text2: "SAU-沙特阿拉伯王国", text: "沙特阿拉伯王国", value: "SAU" },
    { text2: "SDN-苏丹共和国", text: "苏丹共和国", value: "SDN" },
    { text2: "SEN-塞内加尔共和国", text: "塞内加尔共和国", value: "SEN" },
    { text2: "SGP-新加坡共和国", text: "新加坡共和国", value: "SGP" },
    {
      text2: "SGS-南乔治亚岛和南桑德韦奇岛",
      text: "南乔治亚岛和南桑德韦奇岛",
      value: "SGS"
    },
    { text2: "SHN-圣赫勒拿", text: "圣赫勒拿", value: "SHN" },
    {
      text2: "SJM-斯瓦尔巴岛和扬马延岛",
      text: "斯瓦尔巴岛和扬马延岛",
      value: "SJM"
    },
    { text2: "SLB-所罗门群岛", text: "所罗门群岛", value: "SLB" },
    { text2: "SLE-塞拉利昂共和国", text: "塞拉利昂共和国", value: "SLE" },
    { text2: "SLV-萨尔瓦多共和国", text: "萨尔瓦多共和国", value: "SLV" },
    { text2: "SMR-圣马力诺共和国", text: "圣马力诺共和国", value: "SMR" },
    { text2: "SOM-索马里共和国", text: "索马里共和国", value: "SOM" },
    { text2: "SPM-圣皮埃尔和密克隆", text: "圣皮埃尔和密克隆", value: "SPM" },
    { text2: "SRB-塞尔维亚", text: "塞尔维亚", value: "SRB" },
    {
      text2: "STP-圣多美和普林西比民主共和国",
      text: "圣多美和普林西比民主共和国",
      value: "STP"
    },
    { text2: "SUR-苏里南共和国", text: "苏里南共和国", value: "SUR" },
    { text2: "SVK-斯洛伐克共和国", text: "斯洛伐克共和国", value: "SVK" },
    { text2: "SVN-斯洛文尼亚共和国", text: "斯洛文尼亚共和国", value: "SVN" },
    { text2: "SWE-瑞典王国", text: "瑞典王国", value: "SWE" },
    { text2: "SWZ-斯威士兰王国", text: "斯威士兰王国", value: "SWZ" },
    { text2: "SYC-塞舌尔共和国", text: "塞舌尔共和国", value: "SYC" },
    {
      text2: "SYR-阿拉伯叙利亚共和国",
      text: "阿拉伯叙利亚共和国",
      value: "SYR"
    },
    {
      text2: "TCA-特克斯和凯科斯群岛",
      text: "特克斯和凯科斯群岛",
      value: "TCA"
    },
    { text2: "TCD-乍得共和国", text: "乍得共和国", value: "TCD" },
    { text2: "TGO-多哥共和国", text: "多哥共和国", value: "TGO" },
    { text2: "THA-泰王国", text: "泰王国", value: "THA" },
    { text2: "TJK-塔吉克斯坦共和国", text: "塔吉克斯坦共和国", value: "TJK" },
    { text2: "TKL-托克劳", text: "托克劳", value: "TKL" },
    { text2: "TKM-土库曼斯坦", text: "土库曼斯坦", value: "TKM" },
    { text2: "TMP-东帝汶", text: "东帝汶", value: "TMP" },
    { text2: "TON-汤加王国", text: "汤加王国", value: "TON" },
    {
      text2: "TTO-特立尼达和多巴哥共和国",
      text: "特立尼达和多巴哥共和国",
      value: "TTO"
    },
    { text2: "TUN-突尼斯共和国", text: "突尼斯共和国", value: "TUN" },
    { text2: "TUR-土耳其共和国", text: "土耳其共和国", value: "TUR" },
    { text2: "TUV-图瓦卢", text: "图瓦卢", value: "TUV" },
    { text2: "TWN-中国台湾", text: "中国台湾", value: "TWN" },
    {
      text2: "TZA-坦桑尼亚联合共和国",
      text: "坦桑尼亚联合共和国",
      value: "TZA"
    },
    { text2: "UGA-乌干达共和国", text: "乌干达共和国", value: "UGA" },
    { text2: "UKR-乌克兰", text: "乌克兰", value: "UKR" },
    { text2: "UMI-美国本土外小岛屿", text: "美国本土外小岛屿", value: "UMI" },
    { text2: "URY-乌拉圭东岸共和国", text: "乌拉圭东岸共和国", value: "URY" },
    { text2: "USA-美利坚合众国", text: "美利坚合众国", value: "USA" },
    {
      text2: "UZB-乌兹别克斯坦共和国",
      text: "乌兹别克斯坦共和国",
      value: "UZB"
    },
    { text2: "VAT-梵蒂冈城国", text: "梵蒂冈城国", value: "VAT" },
    {
      text2: "VCT-圣文森特和格林纳丁斯",
      text: "圣文森特和格林纳丁斯",
      value: "VCT"
    },
    { text2: "VEN-委内瑞拉共和国", text: "委内瑞拉共和国", value: "VEN" },
    { text2: "VGB-英属维尔京群岛", text: "英属维尔京群岛", value: "VGB" },
    { text2: "VIR-美属维尔京群岛", text: "美属维尔京群岛", value: "VIR" },
    {
      text2: "VNM-越南社会主义共和国",
      text: "越南社会主义共和国",
      value: "VNM"
    },
    { text2: "VUT-瓦努阿图共和国", text: "瓦努阿图共和国", value: "VUT" },
    { text2: "WLF-瓦利斯和富图纳", text: "瓦利斯和富图纳", value: "WLF" },
    { text2: "WSM-萨摩亚独立国", text: "萨摩亚独立国", value: "WSM" },
    { text2: "XXX-未知", text: "未知", value: "XXX" },
    { text2: "YEM-也门共和国", text: "也门共和国", value: "YEM" },
    { text2: "ZAF-南非共和国", text: "南非共和国", value: "ZAF" },
    { text2: "ZMB-赞比亚共和国", text: "赞比亚共和国", value: "ZMB" },
    { text2: "ZWE-津巴布韦共和国", text: "津巴布韦共和国", value: "ZWE" }
  ],
  //注册资金币种
  cus_ccy: [
    { value: "1", text: "人民币", text2: "1-人民币" },
    { value: "12", text: "英镑", text2: "12-英镑" },
    { value: "13", text: "港币", text2: "13-港币" },
    { value: "14", text: "美元", text2: "14-美元" },
    { value: "27", text: "日元", text2: "27-日元" },
    { value: "29", text: "澳大利亚元", text2: "29-澳大利亚元" },
    { value: "38", text: "欧元", text2: "38-欧元" }
  ],

  custAttribute_type: [
    { text2: "5-行政事业单位", text: "行政事业单位", value: "5" },
    { text2: "4-企业客户", text: "企业客户", value: "4" },
    { text2: "2-生产经营型个人客户", text: "生产经营型个人客户", value: "2" },
    {
      text2: "1-非生产经营型个人客户",
      text: "非生产经营型个人客户",
      value: "1"
    },
    { text2: "99-其他", text: "其他", value: "99" }
  ],
  //
  custType_type: [
    { value: "1", text: "个人客户", text2: "1-个人客户" },
    { value: "2", text: "对公客户", text2: "2-对公客户" },
    { value: "3", text: "同业客户", text2: "3-同业客户" },
    { value: "4", text: "集群客户", text2: "4-集群客户" },
    { value: "5", text: "集团客户", text2: "5-集团客户" },
    { value: "6", text: "合作商户客户", text2: "6-合作商户客户" },
    { value: "7", text: "联保客户", text2: "7-联保客户" },
    { value: "8", text: "个经类客户", text2: "8-个经类客户" }
  ],
  withMybankRelat_type: [
    { value: "90", text: "未说明的婚姻状况", text2: "90-未说明的婚姻状况" },
    { value: "10", text: "普通客户", text2: "10-普通客户" },
    { value: "20", text: "员工关联客户", text2: "20-员工关联客户" },
    { value: "30", text: "我行股东", text2: "30-我行股东" },
    { value: "40", text: "我行股东关联企业", text2: "40-我行股东关联企业" }
  ],
  //对公客户证件类型
  com_idenType_type: [
    {
      value: "610001",
      text: "全国组织机构代码证",
      text2: "610001-全国组织机构代码证"
    },
    { value: "610003", text: "银行机构代码证", text2: "610003-银行机构代码证" },
    {
      value: "610005",
      text: "企业法人营业执照",
      text2: "610005-企业法人营业执照"
    },
    { value: "610007", text: "国税登记证", text2: "610007-国税登记证" },
    {
      value: "610019",
      text: "编制委员会登记证书",
      text2: "610019-编制委员会登记证书"
    },
    {
      value: "610021",
      text: "军队、武警财务部门开户证明",
      text2: "610021-军队、武警财务部门开户证明"
    },
    {
      value: "610023",
      text: "社会团体登记证书",
      text2: "610023-社会团体登记证书"
    },
    {
      value: "610025",
      text: "民办非企业登记证书",
      text2: "610025-民办非企业登记证书"
    },
    {
      value: "610027",
      text: "外地常设机构驻在地政府主管部门批文",
      text2: "610027-外地常设机构驻在地政府主管部门批文"
    },
    {
      value: "610029",
      text: "国家主管部门颁外国驻华机构批文",
      text2: "610029-国家主管部门颁外国驻华机构批文"
    },
    {
      value: "610031",
      text: "国家登记机关颁外资企业驻华代表、办事处登记证",
      text2: "610031-国家登记机关颁外资企业驻华代表、办事处登记证"
    },
    {
      value: "610033",
      text: "主管部门颁居民、村民、社区委员会批文",
      text2: "610033-主管部门颁居民、村民、社区委员会批文"
    },
    {
      value: "610035",
      text: "独立核算的附属机构批文",
      text2: "610035-独立核算的附属机构批文"
    },
    { value: "610037", text: "主管部门批文", text2: "610037-主管部门批文" },
    { value: "610039", text: "财政部门证明", text2: "610039-财政部门证明" },
    {
      value: "610041",
      text: "证券投资业务许可证",
      text2: "610041-证券投资业务许可证"
    },
    {
      value: "610043",
      text: "临时经营地工商行政管理部门批文",
      text2: "610043-临时经营地工商行政管理部门批文"
    },
    {
      value: "610045",
      text: "企业名称预先核准通知书",
      text2: "610045-企业名称预先核准通知书"
    },
    { value: "610047", text: "企业营业执照", text2: "610047-企业营业执照" },
    {
      value: "610049",
      text: "个体工商户营业执照",
      text2: "610049-个体工商户营业执照"
    },
    { value: "610051", text: "地税登记证", text2: "610051-地税登记证" },
    {
      value: "610053",
      text: "宗教事务管理部门的批文或证明",
      text2: "610053-宗教事务管理部门的批文或证明"
    },
    { value: "610055", text: "借款合同", text2: "610055-借款合同" },
    {
      value: "610057",
      text: "国家外汇管理部门的批复文件",
      text2: "610057-国家外汇管理部门的批复文件"
    },
    { value: "610059", text: "主管部门许可证", text2: "610059-主管部门许可证" },
    {
      value: "610061",
      text: "建筑施工及安装合同",
      text2: "610061-建筑施工及安装合同"
    },
    { value: "619997", text: "分支机构替代", text2: "619997-分支机构替代" },
    {
      value: "619999",
      text: "其它组织证件类型",
      text2: "619999-其它组织证件类型"
    },
    {
      value: "610063",
      text: "统一社会信用代码",
      text2: "610063-统一社会信用代码"
    }
  ],
  //对私客户证件类型
  cus_idenType_type:[
    {"value":"110001","text":"居民身份证","text2":"110001-居民身份证"},
    {"value":"110003","text":"临时居民身份证","text2":"110003-临时居民身份证"},
    {"value":"110005","text":"户口簿","text2":"110005-户口簿"},
    {"value":"110007","text":"中国人民解放军军人身份证件","text2":"110007-中国人民解放军军人身份证件"},
    {"value":"110009","text":"中国人民武装警察身份证件","text2":"110009-中国人民武装警察身份证件"},
    {"value":"110011","text":"离休干部荣誉证","text2":"110011-离休干部荣誉证"},
    {"value":"110013","text":"军官退休证","text2":"110013-军官退休证"},
    {"value":"110015","text":"文职干部退休证","text2":"110015-文职干部退休证"},
    {"value":"110017","text":"军事院校学员证","text2":"110017-军事院校学员证"},
    {"value":"110019","text":"港澳居民往来内地通行证","text2":"110019-港澳居民往来内地通行证"},
    {"value":"110021","text":"台湾居民来往大陆通行证","text2":"110021-台湾居民来往大陆通行证"},
    {"value":"110023","text":"中华人民共和国因私护照","text2":"110023-中华人民共和国因私护照"},
    {"value":"110025","text":"中华人民共和国因公护照","text2":"110025-中华人民共和国因公护照"},
    {"value":"110027","text":"外国护照","text2":"110027-外国护照"},
    {"value":"110029","text":"外国人永久居留证","text2":"110029-外国人永久居留证"},
    {"value":"119999","text":"其它个人证件类型","text2":"119999-其它个人证件类型"},
  ],
  cus_projectCashCode:[{"text2":"121110000-商品销售收入","text":"商品销售收入","value":"121110000"},{"text2":"121120000-服务业收入","text":"服务业收入","value":"121120000"},{"text2":"121130000-行政税费收入","text":"行政税费收入","value":"121130000"},{"text2":"121140000-城乡个体经营收入","text":"城乡个体经营收入","value":"121140000"},{"text2":"121150000-储蓄存款收入","text":"储蓄存款收入","value":"121150000"},{"text2":"121160000-其他金融性公司收入","text":"其他金融性公司收入","value":"121160000"},{"text2":"121170000-居民归还贷款收入","text":"居民归还贷款收入","value":"121170000"},{"text2":"121180000-汇兑收入","text":"汇兑收入","value":"121180000"},{"text2":"121190000-有价证券及其他投资性收入","text":"有价证券及其他投资性收入","value":"121190000"},{"text2":"1211A0000-其他收入","text":"其他收入","value":"1211A0000"},{"text2":"1211A1000-兑换外币收入","text":"兑换外币收入","value":"1211A1000"},{"text2":"121500000-由人行发行库领取现金","text":"由人行发行库领取现金","value":"121500000"},{"text2":"121600000-信用社（其他银行）交存现金","text":"信用社（其他银行）交存现金","value":"121600000"},{"text2":"122111000-国家工资及奖金支出","text":"国家工资及奖金支出","value":"122111000"},{"text2":"122112000-国家对个人其他支出","text":"国家对个人其他支出","value":"122112000"},{"text2":"122113000-部队存款支出","text":"部队存款支出","value":"122113000"},{"text2":"122114000-其他单位工资性支出","text":"其他单位工资性支出","value":"122114000"},{"text2":"122120000-工矿及其他产品采购支出","text":"工矿及其他产品采购支出","value":"122120000"},{"text2":"122130000-行政企业管理和经营费支出","text":"行政企业管理和经营费支出","value":"122130000"},{"text2":"122140000-城乡个体经营支出","text":"城乡个体经营支出","value":"122140000"},{"text2":"122150000-储蓄存款支出","text":"储蓄存款支出","value":"122150000"},{"text2":"122160000-其他金融性公司支出","text":"其他金融性公司支出","value":"122160000"},{"text2":"122170000-居民提取贷款支出","text":"居民提取贷款支出","value":"122170000"},{"text2":"122180000-汇兑支出","text":"汇兑支出","value":"122180000"},{"text2":"122190000-有价证券及其他投资性支出","text":"有价证券及其他投资性支出","value":"122190000"},{"text2":"1221A0000-其他支出","text":"其他支出","value":"1221A0000"},{"text2":"1221A1000-兑换外币支出","text":"兑换外币支出","value":"1221A1000"},{"text2":"1221B0000-农副产品采购支出","text":"农副产品采购支出","value":"1221B0000"},{"text2":"122500000-交回人行发行库现金","text":"交回人行发行库现金","value":"122500000"},{"text2":"122600000-信用社（其他银行）支取现金","text":"信用社（其他银行）支取现金","value":"122600000"}],
  cus_certificateType:[{"text2":"001-现金支票","text":"现金支票","value":"001"},{"text2":"002-转帐支票","text":"转帐支票","value":"002"},{"text2":"003-银行汇票","text":"银行汇票","value":"003"},{"text2":"005-商业承兑汇票","text":"商业承兑汇票","value":"005"},{"text2":"006-银行承兑汇票","text":"银行承兑汇票","value":"006"},{"text2":"011-网银重要凭证种类","text":"网银重要凭证种类","value":"011"},{"text2":"012-网上银行支付票根","text":"网上银行支付票根","value":"012"},{"text2":"020-储蓄活期存折","text":"储蓄活期存折","value":"020"},{"text2":"022-整存整取存单","text":"整存整取存单","value":"022"},{"text2":"023-零存整取存折","text":"零存整取存折","value":"023"},{"text2":"024-存本取息存折","text":"存本取息存折","value":"024"},{"text2":"025-个人时点存款证明书","text":"个人时点存款证明书","value":"025"},{"text2":"026-IC借记卡凭证","text":"IC借记卡凭证","value":"026"},{"text2":"027-借记卡(成品卡)","text":"借记卡(成品卡)","value":"027"},{"text2":"028-借记卡(本外币定期储蓄存折)","text":"借记卡(本外币定期储蓄存折)","value":"028"},{"text2":"029-智能存款储蓄存折","text":"智能存款储蓄存折","value":"029"},{"text2":"030-对公存折","text":"对公存折","value":"030"},{"text2":"031-对公存款证明","text":"对公存款证明","value":"031"},{"text2":"033-单位定期存款存单","text":"单位定期存款存单","value":"033"},{"text2":"034-单位通知存款存单","text":"单位通知存款存单","value":"034"},{"text2":"035-本票","text":"本票","value":"035"},{"text2":"036-个人通知存单","text":"个人通知存单","value":"036"},{"text2":"037-国债存单","text":"国债存单","value":"037"},{"text2":"047-定活两便存单","text":"定活两便存单","value":"047"},{"text2":"051-单位存款证实书","text":"单位存款证实书","value":"051"},{"text2":"052-商业本票","text":"商业本票","value":"052"},{"text2":"053-单位结构性存款证实书","text":"单位结构性存款证实书","value":"053"},{"text2":"054-国债收款凭证","text":"国债收款凭证","value":"054"},{"text2":"061-预制卡","text":"预制卡","value":"061"},{"text2":"062-业务委托书","text":"业务委托书","value":"062"},{"text2":"065-待发卡","text":"待发卡","value":"065"},{"text2":"070-信用证","text":"信用证","value":"070"},{"text2":"073-印花税票","text":"印花税票","value":"073"},{"text2":"082-股金凭证","text":"股金凭证","value":"082"},{"text2":"083-U盾","text":"U盾","value":"083"},{"text2":"0833-银企直联key","text":"银企直联key","value":"0833"},{"text2":"092-任我存整存整取存单","text":"任我存整存整取存单","value":"092"},{"text2":"093-岁月留金","text":"岁月留金","value":"093"},{"text2":"097-个人协议存款存单","text":"个人协议存款存单","value":"097"},{"text2":"098-存单","text":"存单","value":"098"},{"text2":"099-其他","text":"其他","value":"099"},{"text2":"328-个人时段存款证明书","text":"个人时段存款证明书","value":"328"},{"text2":"332-城市商业银行汇票","text":"城市商业银行汇票","value":"332"},{"text2":"370-投资时段证明","text":"投资时段证明","value":"370"}],
}
export {
	DICTS
}
