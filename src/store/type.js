// 全局loading
export const FETCH_LOADING = 'false';
// 全局404
export const NETWORK_ERROR = 'false';

export const SCHEDULE_TYPE = 'week';
// 帮助
export const HELP_MAIN_TEACHER = [
  {
    'qusetion' : '1.初始密码问题？' ,
    'answer' : ['账号为您的手机号，默认密码为123456','密码不正确，可通过忘记密码设置新密码重新登陆。']
  },
  {
    'qusetion' : '2.摄像头看不见？' ,
    'answer' : ['检查设备是否被禁用检查杀毒软件是否关闭','检查摄像头灯是否亮','外接摄像头插口是否插好','检查摄像头是否被其他程序占用','查看QQ是否可用','判断用户电脑是双显卡还是单显卡','升级驱动','微软Surface笔记本，升级Win10周年版之后会有一些用户电脑在摄像头处发生闪退、出现弹窗（视频源）无法打开摄像头若更换了设备，需重新进入设备测试选择更换的设备并进行测试。']
  },
  {
    'qusetion' : '3.麦克风无声或者声音很小？' ,
    'answer' : ['检测麦克风插口是否插好检测设备是否禁用','查看自检页面是否音量过小','查看麦克风是否静音或者音量过小','检测系统中麦克风设备是否选择正确','联系家长查看QQ麦克风是否正常','升级驱动','若更换了设备，需重新进入设备测试选择更换的设备并进行测试。']
  },
  {
    'qusetion' : '4.麦克风有杂音？' ,
    'answer' : ['确认是否佩戴耳机','检测360等杀毒软件件是否退出','检查麦克风增强是否过大','检查下是否有音箱等干扰设备','麦克风可能是和摄像头放在一起的，收到外音干扰的可能性比较大，建议使用耳带式麦克风设备。']
  },
  {
    'qusetion' : '5.扬声器听不见？' ,
    'answer' : ['确认用户自检页面音量调节到最大确认用户耳机插口是否插好','确认用户耳机是否有线控开关和线控音量调节键','确认用户电脑系统中扬声器音量正常，并设置为默认设备','确认杀毒软件是否关闭','确认设备选择正确','查看QQ是否正常工作','升级驱动','若更换了设备，需重新进入设备测试选择更换的设备并进行测试。']
  },
  {
    'qusetion' : '6.客户端卡顿？' ,
    'answer' : ['使用设备测试检测网络质量是否良好','为保证更好的网络环境，请尽量使用有线网络','使用无线网络请尽量靠近路由器上课。']
  },
  {
    'qusetion' : '7.课件相关问题？' ,
    'answer' : ['课件仅支持上传pdf、ppt、pptx、doc、docx','课件上传速度与您的网络环境和课件大小有关','课件若上传失败，请自行转换pdf格式后再次尝试上传。转换地址：https://smallpdf.com/cn','课件翻页加载速度与课件中承载的图片多少有关','课件上传后内容显示不正常，请老师自行转换成pdf格式再上传。']
  },
  {
    'qusetion' : '8.课程录制？' ,
    'answer' : ['老师端无需手动录制上课视频和发送邮件，客户端会自动录制并上传课程视频提供给学生回看。']
  },
  {
    'qusetion' : '9.课没讲完，课程结束后自动退出房间了怎么办？' ,
    'answer' : ['老师端在课程结束之前，若有需要延长讲课时间，请及时设置拖堂，以免影响上课。若未设置拖堂，到课程结束时间自动拖堂5分钟，5分钟过后老师端将自动退出教室。']
  },
  {
    'qusetion' : '10.课件页面和学生显示的不一致怎么办？' ,
    'answer' : ['告知学生课件不一致的情况，然后老师端前后翻页即可解决。']
  },
  {
    'qusetion' : '11.上课系统里，学生的画笔、橡皮等工具不能使用怎么办？' ,
    'answer' : ['上课过程中，需要老师端授权才能使用这些功能。']
  },
  {
    'qusetion' : '12.待上课程列表中没有课怎么办？' ,
    'answer' : ['联系排课老师端是否安排课程','若已确认排课成功，点击客户端右上角刷新按钮尝试刷新列表','确认帐号是否正确。']
  },
  {
    'qusetion' : '13.手写板打开，USB设备也插上，但点击连接按钮就是检查不到设备怎么办？' ,
    'answer' : ['检查手写板是否正在充电，若在充电，手写板无法连接使用。']
  },
  {
    'qusetion' : '14.手写板连接成功，写字为什么没有反应？' ,
    'answer' : ['检查是否拿错笔？若没有拿错笔，手写笔是否还有电？']
  },
  {
    'qusetion' : '15.安装客户端时，安装程序提示：另一个程序正在使用？' ,
    'answer' : ['同时只能一个安装程序运行安装，请检查是否重复打开了两个或两个以上安装程序。']
  },
  {
    'qusetion' : '16.新客户端能查看旧客户端录制的视频吗？' ,
    'answer' : ['不可以。新客户端只能看到在新客户端上课的视频。']
  },
  {
    'qusetion' : '17.进入教室，耳机一直在回放设备测试的录音？' ,
    'answer' : ['设备测试麦克风正常后，请点击停止测试。']
  },
  {
    'qusetion' : '18.有没有开课功能呀？' ,
    'answer' : ['客户端不支持老师自己开课。']
  },
  {
    'qusetion' : '19.客户端内容显示比例失调？' ,
    'answer' : ['请尝试设置显示器显示比例或分辨率的大小。']
  },
];
//tab栏
export const CLASS_TAB = [
  {value: '一对一'},
  {value: '小班课'},
];
//科目
export const SUBJEXT_LIST = [
  {value: '', label: '全部'},
  {value: '语文', label: '语文'},
  {value: '数学', label: '数学'},
  {value: '英语', label: '英语'},
  {value: '物理', label: '物理'},
  {value: '化学', label: '化学'},
  {value: '生物', label: '生物'},
  {value: '政治', label: '政治'},
  {value: '历史', label: '历史'},
  {value: '地理', label: '地理'},
  {value: '科学', label: '科学'},
];

export const NOTICE_LIST = [
  {
    text: '「必读」课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程，请老师详细解读。',
    date: '12 - 29'
  },
  {
    text: '「必读」课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程，请老师详细解读。',
    date: '12 - 28'
  },
  {
    text: '「必读」课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程，请老师详细解读。',
    date: '12 - 27'
  },
  {
    text: '「必读」课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程课件的基本规范及制作教程，请老师详细解读。',
    date: '12 - 26'
  },
];


export const DATE_LIST = [
  {
    week: 1,
    date: [
      {day: 28, class: 0, month: 12},
      {day: 29, class: 0, month: 12},
      {day: 30, class: 0, month: 12},
      {day: 31, class: 0, month: 12},
      {day: 1, class: 1, month: 1},
      {day: 2, class: 0, month: 1},
      {day: 3, class: 1, month: 1},
    ]
  },
  {
    week: 2,
    date: [
      {day: 4, class: 0, month: 1},
      {day: 5, class: 0, month: 1},
      {day: 6, class: 0, month: 1},
      {day: 7, class: 0, month: 1},
      {day: 8, class: 1, month: 1},
      {day: 9, class: 1, month: 1},
      {day: 10, class: 1, month: 1},
    ]
  },
  {
    week: 3,
    date: [
      {day: 11, class: 1, month: 1},
      {day: 12, class: 1, month: 1},
      {day: 13, class: 0, month: 1},
      {day: 14, class: 0, month: 1},
      {day: 15, class: 0, month: 1},
      {day: 16, class: 1, month: 1},
      {day: 17, class: 1, month: 1},
    ]
  },
  {
    week: 4,
    date: [
      {day: 18, class: 1, month: 1},
      {day: 19, class: 1, month: 1},
      {day: 20, class: 1, month: 1},
      {day: 21, class: 1, month: 1},
      {day: 22, class: 1, month: 1},
      {day: 23, class: 1, month: 1},
      {day: 24, class: 1, month: 1},
    ]
  },
  {
    week: 5,
    date: [
      {day: 25, class: 1, month: 1},
      {day: 26, class: 1, month: 1},
      {day: 27, class: 0, month: 1},
      {day: 28, class: 0, month: 1},
      {day: 29, class: 1, month: 1},
      {day: 30, class: 1, month: 1},
      {day: 31, class: 1, month: 1},
    ]
  },
];
export const CLASS_TIP = [
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', subject: '数学', student: '薛佳佳'},
];
export const CLASS_LIST = [
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 1, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 1, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 1, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 1, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
  {time: '08:00  -  08:45', state: 0, subject: '数学', student: '薛佳佳'},
];
//薪资管理
export const WAGES_LIST = [
  {
    date: '2017年12月',
    money: "15000",
    cepin: 50,
    zhengshi: 150,
    money2: "10500",
    reward: "0"
  },
  {
    date: '2018年1月',
    money: "13000",
    cepin: 50,
    zhengshi: 150,
    money2: "10500",
    reward: "0"
  },
  {
    date: '2018年2月',
    money: "12000",
    cepin: 50,
    zhengshi: 150,
    money2: "10500",
    reward: "0"
  },
  {
    date: '2018年3月',
    money: "11000",
    cepin: 50,
    zhengshi: 150,
    money2: "10500",
    reward: "0"
  }
];
export const SALARY_LIST = [
  {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  },
  {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  }, {
    student: '王小明',
    schooltime: 18,
    money: '10',
    attendance: "正常",
    remarks: "未转化"
  },

];
export const REWARD_LIST = [
  {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  },
  {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  }, {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  }, {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  }, {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  }, {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  }, {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  }, {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  }, {
    student: '元旦课时补贴',
    schooltime: 18,
    money: '银行卡',
    attendance: "未通过"
  },

];
//待上课程
export const CW_LIST = [
  {
    "total": 6,
    "list": [
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-03-01",
        "startTime": "18:36",
        "endTime": "18:37",
        "subject": "化学",
        "studentName": "战歌",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null,
        "imgUrl": "./src/assets/images/cBg.png",
        "video": "1"
      },
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-03-01",
        "startTime": "11:30",
        "endTime": "12:30",
        "subject": "化学",
        "studentName": "战歌",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null,
        "imgUrl": "./src/assets/images/cBg.png",
        "video": "1"
      }, {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-03-01",
        "startTime": "12:40",
        "endTime": "13:30",
        "subject": "化学",
        "studentName": "战歌",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null,
        "imgUrl": "./src/assets/images/cBg.png",
        "video": "1"
      },
       {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-03-01",
        "startTime": "17:05",
        "endTime": "17:18",
        "subject": "化学",
        "studentName": "战歌",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null,
        "imgUrl": "./src/assets/images/cBg.png",
        "video": "1"
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2018-03-01",
        "startTime": "17:08",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二",

        "imgUrl": "./src/assets/images/cBg.png",
        "video": ""
      },
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-03-01",
        "startTime": "14:18",
        "endTime": "23:30",
        "subject": "化学",
        "studentName": "测试3",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2018-03-01",
        "startTime": "14:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
    ]
  },
  {
    "total": 5,
    "list": [
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-01-23",
        "startTime": "01:30",
        "endTime": "23:30",
        "subject": "化学",
        "studentName": "新天",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null
      },
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-01-19",
        "startTime": "01:30",
        "endTime": "23:30",
        "subject": "化学",
        "studentName": "号1",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      },
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-01-19",
        "startTime": "01:30",
        "endTime": "23:30",
        "subject": "化学",
        "studentName": "学1",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
    ]
  },
  {
    "total": 4,
    "list": [
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2018-01-24",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      },
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-01-19",
        "startTime": "01:30",
        "endTime": "23:30",
        "subject": "化学",
        "studentName": "测试1",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
    ]
  },
  {
    "total": 4,
    "list": [
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2018-01-25",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      },
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-01-19",
        "startTime": "01:30",
        "endTime": "23:30",
        "subject": "化学",
        "studentName": "测试1",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
    ]
  },
  {
    "total": 4,
    "list": [
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2018-01-26",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      },
      {
        "courseUuid": "6046718e0b124270a494bfdd59ad6936",
        "courseDate": "2018-01-19",
        "startTime": "01:30",
        "endTime": "23:30",
        "subject": "化学",
        "studentName": "测试1",
        "courseType": 0,
        "studentSex": 1,
        "subjectVersion": "鲁教五四新版",
        "studyStatus": "方法不佳，孩子目标定位很高，对自己要求也很高，给自己压力很大，成绩基本上排在年级前五名，近期几次语文模拟成绩，作为成绩不是很理想，想补习作文。",
        "grade": "小三",
        "monthPoint": null,
        "termPoint": null,
        "otherPoint": null
      },
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
      ,
      {
        "courseUuid": "406F54E4-B84A-4F18-97C0-7B987A3C3A7F",
        "courseDate": "2017-08-01",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "科学",
        "studentName": "张和诚",
        "courseType": 1,
        "studentSex": 0,
        "subjectVersion": "浙教版",
        "studyStatus": "均衡,拔",
        "grade": "初二"
      }
    ]
  }
];
//课程记录
export const CR_list = [
  {
    "courseDate": "2018-01-29",
    "list": [
      {
        "courseUuid": "test3",
        "courseDate": "2018-01-29",
        "startTime": "12:00",
        "endTime": "13:00",
        "subject": "测评课",
        "name": "测试",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      }
    ]
  },
  {
    "courseDate": "2018-01-24",
    "list": [
      {
        "courseUuid": "test2",
        "courseDate": "2018-01-24",
        "startTime": "19:00",
        "endTime": "20:00",
        "subject": "测评课",
        "name": "测试",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      },
      {
        "courseUuid": "test1",
        "courseDate": "2018-01-24",
        "startTime": "08:00",
        "endTime": "09:00",
        "subject": "测评课",
        "name": "测试",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      }
    ]
  },
  {
    "courseDate": "2018-01-15",
    "list": [
      {
        "courseUuid": "7006AED4-6E8D-443D-819E-20B00A916E1F",
        "courseDate": "2018-01-15",
        "startTime": "00:30",
        "endTime": "23:30",
        "subject": "测评课",
        "name": "杜宗轩",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      }
    ]
  },
  {
    "courseDate": "2017-11-19",
    "list": [
      {
        "courseUuid": "31A07FDC-E12F-43AF-8454-0001B370B5E6",
        "courseDate": "2017-11-19",
        "startTime": "16:00",
        "endTime": "17:00",
        "subject": "科学",
        "name": "詹溢宁",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": "初三",
        "subjectVersion": "浙教版"
      },
      {
        "courseUuid": "EF00191C-CA9C-4758-B285-0F0652B38CA0",
        "courseDate": "2017-11-19",
        "startTime": "13:00",
        "endTime": "14:00",
        "subject": "科学",
        "name": "吴昊",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": "初三",
        "subjectVersion": "浙教版"
      }
    ]
  },
  {
    "courseDate": "2017-11-18",
    "list": [
      {
        "courseUuid": "0649D5DA-EFCF-4181-A60F-9C6CD5595FBD",
        "courseDate": "2017-11-18",
        "startTime": "21:00",
        "endTime": "22:00",
        "subject": "科学",
        "name": "章博函",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": "初一",
        "subjectVersion": "华东师大版"
      },
      {
        "courseUuid": "5BF7078D-064E-4B86-8F82-1A01A75827CB",
        "courseDate": "2017-11-18",
        "startTime": "16:00",
        "endTime": "17:00",
        "subject": "科学",
        "name": "潘聪聪",
        "courseType": 0,
        "classTeacherAppraiseUuid": null,
        "grade": "初三",
        "subjectVersion": "人教版"
      }
    ]
  },
  {
    "courseDate": "2017-11-12",
    "list": [
      {
        "courseUuid": "90D36465-1CFB-4D40-9F98-FB852F567A9F",
        "courseDate": "2017-11-12",
        "startTime": "9：00",
        "endTime": "10:00",
        "subject": "正式课",
        "name": "黄子诚",
        "courseType": 1,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      },
      {
        "courseUuid": "7B77ADE7-67F7-4F92-9F51-01B015AFDA59",
        "courseDate": "2017-11-12",
        "startTime": "8:30",
        "endTime": "09:00",
        "subject": "正式课",
        "name": "黄子诚",
        "courseType": 1,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      },
      {
        "courseUuid": "BDF51D7E-2553-43FE-AEA3-D8D9AF378D42",
        "courseDate": "2017-11-12",
        "startTime": "12:30",
        "endTime": "13:00",
        "subject": "正式课",
        "name": "胡鑫灵",
        "courseType": 1,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      },
      {
        "courseUuid": "19A4546C-8EAD-4DE6-8F99-02F2217F279C",
        "courseDate": "2017-11-12",
        "startTime": "11：00",
        "endTime": "12:00",
        "subject": "正式课",
        "name": "胡鑫灵",
        "courseType": 1,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      },
      {
        "courseUuid": "2F1B42DA-7456-4A2D-B2B2-86C8B95871F7",
        "courseDate": "2017-11-12",
        "startTime": "10：00",
        "endTime": "11:00",
        "subject": "正式课",
        "name": "邬子昱",
        "courseType": 1,
        "classTeacherAppraiseUuid": null,
        "grade": null,
        "subjectVersion": null
      }
    ]
  }
];
