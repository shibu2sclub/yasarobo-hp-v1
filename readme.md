# やさしいロボコンホームページ
[https://yasarobo.sclub.dev](https://yasarobo.sclub.dev)

## 公開の仕組み
GitHub Pagesの独自ドメイン機能とsclub.devのDNS設定。自前のサーバを持たない。

## 年度の更新


## データの書き方（年度問わず共通）
### common.json
サイト全体に関する設定のJSONファイル。

```json:common.json
{
    "year": 2023,
    "showRecord": false,
    "pastYears": [
        2021,
        2022
    ]
}
```

* year: トップページに掲載されている=最新のコンテストの開催年度。（第〇回大会のような大会のカウントとしての数値、1月～3月の場合は開催当日の年月日とは相違が生じる。）
* showRecord: 競技記録・ロボット一覧を表示するかの設定。表示できる状態となったら```true```に。
* pastYears: 過去大会の年度リスト。

### news-label-setting.json
ニュースに付与するラベルの設定。

```json:news-label-setting.json
[
    {
        "id": "important",
        "color": "#DD4141",
        "name": "重要"
    },
    {
        "id": "visitor",
        "color": "#24633B",
        "name": "来場者"
    },
    {
        "id": "contestant",
        "color": "#24633B",
        "name": "出場者"
    },
    {
        "id": "others",
        "color": "#3C3C3C",
        "name": "その他"
    }
]
```

* id: ```news.json```で指定するラベル名。
* color: ラベルの背景色。```#xxxxxx```表記（16進数）と```red```などの色表記の両方に対応。
* name: 実際のニュースで表示されるラベルの名称。

### index-slideshow.json
トップページ最上部のスライドショーの設定。

```json:index-slideshow.json
[
    {
        "img": "/img/index-slideshow/dikefalos.webp"
    },
    {
        "img": "/img/index-slideshow/2022yasarobo-3.webp",
        "caption": "やさしいロボコン2022年プレ大会の様子"
    }
]
```

* img: 画像の場所。基本的に絶対パスを推奨。
* （任意）caption: 画像の説明文。全角20字以内を推奨。

### index-video.json
トップページ最上部でPC版のみ表示される動画の設定。

```json:index-video.json
{
    "video-enabled": true,
    "id": "cW514x4bg20",
    "center": {
        "x": 50,
        "y": 50
    },
    "start": 93
}
```

* video-enabled: PC版で動画を表示するか。trueで表示、falseではスライドショーを表示。
* id: YouTubeの動画のID。URLに含まれる。
* start: 動画の再生開始時間。途中から再生できる。

#### common.jsonのyearが影響する範囲
yearは非常に広範な範囲で用いているため、この場で影響範囲を記載している。

* ホームページ全体で表示に使用するデータの年度
* ロゴの年度部分

## データの書き方（大会（=年度）ごと）
年度のフォルダ内に存在。年度の変更は「年度の更新」章を参照のこと。

### information.json
大会の開催情報。トップページ~~とトップページ含む全ての「アクセス」~~ において用いている。

```json:information.json
{
    "date": "2023.12.3",
    "time": "11:00 ~ 15:00",
    "timeDetail": "午前中はロボット調整の時間とし、ロボコンの競技は11時頃に開始、15時頃までには終了する予定です。<br>なおこの予定は変更されることもあります。決まり次第HPにてご連絡いたします。",
    "place": {
        "name": "渋谷教育学園渋谷中学高等学校",
        "name2": "6階 理科室3",
        "postCode": "150-0002",
        "address": "東京都渋谷区渋谷1-21-18",
        "transportation": [
            {
                "place": "渋谷駅からお越しの方",
                "detail": [
                    "東急・東京メトロ B1出口から徒歩7分",
                    "JR ハチ公改札口・南改札口から徒歩15分",
                    "京王井の頭線 中央口から徒歩20分"
                ]
            },
            {
                "place": "明治神宮前＜原宿＞駅からお越しの方",
                "detail": [
                    "東京メトロ 4番・7番出口から徒歩15分"
                ]
            },
            {
                "place": "原宿駅からお越しの方",
                "detail": [
                    "JR山手線 東口から徒歩25分"
                ]
            }
        ],
        "googleMap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.539293618878!2d139.7005870762712!3d35.66372083093489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca6441b7da1%3A0x322d8cd231d2a237!2z5riL6LC35pWZ6IKy5a2m5ZyS5riL6LC35Lit5a2m5qCh44O76auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1696476210042!5m2!1sja!2sjp"
    },
    "organizer": [
        {
            "name": "渋谷教育学園渋谷中学高等学校 理科部ロボコン班",
            "link": "https://shibu2rikabu.mystrikingly.com/"
        }
    ],
    "inquiry": {
        "name": "渋谷教育学園渋谷中学高等学校 理科部ロボコン班 やさしいロボコン担当",
        "linkName": "yasarobo@googlegroups.com",
        "link": "mailto:yasarobo@googlegroups.com"
    }
}
```

* date: 開催日。記法は```yyyy.mm.dd```で、一桁の場合も基本0はつけないで良い。
* time: 開催時刻。
* （任意）timeDetail: 開催時刻に関する詳細情報。
* place: 開催場所。
    * name: 開催施設の名前。
    * name2: 部屋の名前。
    * postCode: 郵便番号。ハイフンは入れる。
    * address: 住所。
    * transportation: 公共交通機関によるアクセス方法を配列で記載。そのまま表示される。
        * place: 特定の駅
        * detail: 各社からの出口、所要時間を配列で記載。そのまま表示される。
    * googleMap: Google Mapの埋め込みタグ入手時の```src```内にあるURL。
* organizer: 主催者の一覧。複数の主催者を配列で記載。
    * name: 主催者名
    * （任意）link: 主催者のURL
* inquiry: お問い合わせ
    * name: お問い合わせ先の名前
    * linkName: お問い合わせ先のリンク名。メールアドレスかリンク先の名前を記載する。
    * link: お問い合わせ先のURL（メールアドレスなら```mailto:```をつけること）

### news.json
ニュース記事のJSONファイル。

```json:setting.json
[
    {
        "id": "2023-2",
        "title": "やさしいロボコン開催決定！",
        "label": [
            "important"
        ],
        "date": "2023.10.07",
        "article": [
            "やさしいロボコンの開催が決定しました！",
            "知能ロボコンを知っていますか？毎年6月頃に宮城県仙台市で行われる、全自動で動く自律ロボットのコンテストです。",
            "この知能ロボコンの特徴は、「Festival（お祭り）」だということ。勝ち負けだけのロボコンじゃない。技術やアイデアを持ち寄って、みんなで楽しむ。",
            "私たち渋渋理科部では、「知能ロボコンの会場の雰囲気を伝えたい」「知能ロボコンに出てみたい、実際に見てみたい」という人を増やしたいと思っており、知能ロボコンの魅力を伝えるべくこの冬に「やさしいロボコン」の開催を計画しています。",
            "「やさしいロボコン」はオープン大会です。もともと校内大会で始めたものですが、お祭りはみんなで楽しまないと。賞品とかはないですが、「知能ロボコンの半年前に完成させた」という達成感と自信は、お土産になるかと思います。",
            "ぜひ参戦してみませんか？見学・観覧も大歓迎です！初心者の方から経験者の方まで、ぜひ来てください！スタッフや参加者たちと、ロボコンについて熱く語りあえる場を提供できたらと考えています。",
            "開催日時：2023年12月3日 11時～15時<br>開催場所：渋谷教育学園渋谷中学高等学校",
            "詳細はトップページをご覧ください。"
        ]
    },
    {
        "id": "2023-1",
        "title": "ホームページを公開しました！",
        "label": [
            "others"
        ],
        "date": "2023.10.07"
    }
]
```

```{}```でニュース1件。配列順序はそのまま記事の順序になり、上から順に表示。基本的には上に重要なニュースor新しいニュースを載せる。

* id: 記事ID。URLに反映される。このファイルの中で一意に設定。```?```や```&```、``` ```（半角スペース）は使用不可能。全角文字も避ける。
* title: 記事タイトル。
* label: 記事のラベル（カテゴリ）。複数配置も可能な記法としているが基本的に一つにするように（対応していない）。ラベルの種類は```news-tag-setting.json```で設定する。
* date: 日付。そのまま表示される。仕様上はどのような文字列でも問題ないが、デザインにおいて基本的には```yyyy.mm.dd```表記を想定しているため、一桁の場合は先頭に0を入れることを推奨。
* article: 記事本文。1段落ごとに1項目で配列とする。

### record-setting.json
競技記録のデータ体裁に関する設定。

```json:record-setting.json
{
    "type": "detailed"
}
```

* type: ```simple```、```default```、```detailed```
    * simple: 集計結果の得点のみ。
    * default: ボールや缶の取得状況、色を含んだデータ。```simple```に加えて得点の内訳が表示される。
    * detailed: ```default```のデータを順番まで競技中の時間経過に沿って入力したもの。```default```に加えて得点順が表示される。

### record.json
競技記録。```{}```でロボット1組。

#### typeがdefaultまたはdetailedの場合
```json:record.json
[
    {
        "id": "C01",
        "name": "くらげ君",
        "team": "しぶしぶ「寿」",
        "belonging": "渋渋理科部",
        "result": {
            "1st": {
                "contest": [
                    "TBYrrr",
                    "TRRBBYYYYRRRBBB"
                ],
                "remainTime": "1:20:15" 
            }
        }
    },
    {
        "id": "C04",
        "name": "mako-robo Surprising VIIctory",
        "team": "しぶしぶ「射」",
        "belonging": "渋谷中高理科部",
        "result": {
            "1st":{
                "contest": [
                    "TRYYRRRYBBBRBByy"
                ],
                "remainTime": "1:56:34"
            }
        }
    }
]
```

* ID: ゼッケン番号。1文字目でコース認識。
    * C: チャレンジャーズ
    * M: マスターズ
    * Y: やさしい
* name: ロボット名
* team: チーム名
* （任意）belonging: 所属
* result: 結果
    * 1st: 1回目
    * 1st: 2回目
        * contest: 競技点情報。以下のルールに沿って文字を羅列。```detailed```の場合は時間順に書くこと。リトライごとに1個ずつの文字列。最後の文字列が最後の試技なので最終結果。
            * R, Y, B: 赤、黄、青ボール（色正解）
            * r, y, b: 赤、黄、青ボール（色不正解）
            * S: **S**teel（マスターズ）スチール缶（色正解）
            * s: **s**teel（マスターズ）スチール缶（色不正解）
            * A: **A**luminium（マスターズ）アルミ缶（色正解）
            * a: **a**luminium（マスターズ）アルミ缶（色不正解）
            * W, w: **W**ater bottle（マスターズ）ウォーターボトル成功
            * M, m: **M**ama ball（やさしい）左エリア用ママボール（色関係なし）
            * S, s: **S**ponge ball（やさしい）右エリア用スポンジボール（色関係なし）
            * M, m: **M**asters return bonus（マスターズ）リターンボーナス
            * O, o: **O**riginality bonus（やさしい）オリジナリティボーナス（必ず先頭に表記）
        * remainTime: 残り時間。```mm:ss:xx```のように書く。0はなくても補うが、基本的に分以外は一桁の場合先頭に0を付けることが望ましい。
        * （任意）judge: 審査点

#### typeがsimpleの場合
```json:record.json
[
    {
        "id": "C01",
        "name": "くらげ君",
        "team": "しぶしぶ「寿」",
        "belonging": "渋渋理科部",
        "result": {
            "1st": {
                "contest": {
                    "score": 50,
                    "retry": 1
                },
                "remainTime": "1:20:15" 
            }
        }
    }
]
```

異なる部分のみ記載する。
* contest: 競技点情報
    * score: 競技点（数値）
    * retry: リトライ回数