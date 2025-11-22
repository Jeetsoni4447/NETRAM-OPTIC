import pymongo
import json
from pymongo import MongoClient
import urllib.parse

# JSON data
data = {
"frames": [
    {
      "pro_id": 1001,
      "pro_name": "Enfys RT5897",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_RT5897_C4_i2.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i2.WebP",
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i3.WebP",
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i4.WebP",
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i1.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "black",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_rating": 4.6,
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1002,
      "pro_name": "Tom hardy 66010",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_66010_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_66010_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66010_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66010_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66010_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "yellow",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "rect",
      "pro_gender": "kids",
      "pro_rating": 4.6,
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1003,
      "pro_name": "Tom hardy 66010",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/Tom hardy_66010_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/Tom hardy_66010_C2_i1.WebP",
        "/public/imgs/frames/Tom hardy_66010_C2_i2.WebP",
        "/public/imgs/frames/Tom hardy_66010_C2_i3.WebP",
        "/public/imgs/frames/Tom hardy_66010_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "pink",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1004,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 600,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "green",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1005,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 400,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "orange",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1006,
      "pro_name": "enfys extra",
      "pro_price": 6000,
      "pro_image": "/public/imgs/frames/enfys/enfys I216 C4.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_DTX118_46_01.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_49_02.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1007,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 400,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i1_C3_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i4.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i5.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "aqua",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1008,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 400,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i4.WebP"
      ],
      "pro_style": "half_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1009,
      "pro_name": "Tom hardy 66009",
      "pro_price": 310,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "aqua",
      "pro_size": "M",
      "pro_rating": 4.7,
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1010,
      "pro_name": "Tom hardy 66009",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_66009_i1_C2.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_66009_i1_C2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_i2_C2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_i3_C2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_i4_C2.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "red",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1011,
      "pro_name": "Tom hardy 66009",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/extra/iMTELER_87605_i1_C1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/iMTELER_87605_i1_C1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_i2_C1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_i3_C1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_i4_C1.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "red",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.7,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1012,
      "pro_name": "Tom hardy 66009",
      "pro_price": 399,
      "pro_image": "/public/imgs/frames/extra/iMTELER_87605_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/iMTELER_87605_C4_i1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_C4_i2.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_C4_i3.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "cateye",
      "pro_rating": 4.7,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "iMTELER"
    },
    {
      "pro_id": 1013,
      "pro_name": "First time 100104",
      "pro_price": 659,
      "pro_image": "/public/imgs/frames/extra/Firsttime_100104_C5_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Firsttime_100104_C5_i1.WebP",
        "/public/imgs/frames/extra/Firsttime_100104_C5_i2.WebP",
        "/public/imgs/frames/extra/Firsttime_100104_C5_i3.WebP",
        "/public/imgs/frames/extra/Firsttime_100104_C5_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1014,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1015,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1016,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C5_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1017,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "square",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1018,
      "pro_name": "Bubbles mini 8602",
      "pro_price": 359,
      "pro_image": "/public/imgs/frames/Bubbles_mini_8602_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/Bubbles_mini_8602_i1.WebP",
        "/public/imgs/frames/Bubbles_mini_8602_i2.WebP",
        "/public/imgs/frames/Bubbles_mini_8602_i3.WebP",
        "/public/imgs/frames/Bubbles_mini_8602_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.9,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "bubbles_mini"
    },
    {
      "pro_id": 1019,
      "pro_name": "Ccuteboyz 26907",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/Ccuteboyz_26907_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/Ccuteboyz_26907_i1.WebP",
        "/public/imgs/frames/Ccuteboyz_26907_i2.WebP",
        "/public/imgs/frames/Ccuteboyz_26907_i3.WebP",
        "/public/imgs/frames/Ccuteboyz_26907_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "cateye",
      "pro_rating": 4.9,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "ccuteboyz"
    },
    {
      "pro_id": 1020,
      "pro_name": "Firsttime 1672",
      "pro_price": 660,
      "pro_image": "/public/imgs/frames/extra/Firsttime_1672_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Firsttime_1672_i1.WebP",
        "/public/imgs/frames/extra/Firsttime_1672_i2.WebP",
        "/public/imgs/frames/extra/Firsttime_1672_i3.WebP",
        "/public/imgs/frames/extra/Firsttime_1672_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.5,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1021,
      "pro_name": "LEO MiNi 35012BM",
      "pro_price": 459,
      "pro_image": "/public/imgs/frames/extra/LEO_MiNi_35012BM_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "leo_mini"
    },
    {
      "pro_id": 1022,
      "pro_name": "LEO MiNi 35037",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/extra/lEO_MINi_35037_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/lEO_MINi_35037_i1.WebP",
        "/public/imgs/frames/extra/lEO_MINi_35037_i2.WebP",
        "/public/imgs/frames/extra/lEO_MINi_35037_i3.WebP",
        "/public/imgs/frames/extra/lEO_MINi_35037_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "cateye",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "leo_mini"
    },
    {
      "pro_id": 1023,
      "pro_name": "LEO MiNi 35037",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/extra/LEO_MiNi_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/LEO_MiNi_i1.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_i2.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_i3.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "leo_mini"
    },
    {
      "pro_id": 1024,
      "pro_name": "PROSTYLE 9417402",
      "pro_price": 380,
      "pro_image": "/public/imgs/frames/PROSTYLE_9417402_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/PROSTYLE_9417402_i1.WebP",
        "/public/imgs/frames/PROSTYLE_9417402_i2.WebP",
        "/public/imgs/frames/PROSTYLE_9417402_i3.WebP",
        "/public/imgs/frames/PROSTYLE_9417402_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "prostyle"
    },
    {
      "pro_id": 1025,
      "pro_name": "Revio 925006",
      "pro_price": 399,
      "pro_image": "/public/imgs/frames/extra/Revio_925006_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Revio_925006_i1.WebP",
        "/public/imgs/frames/extra/Revio_925006_i2.WebP",
        "/public/imgs/frames/extra/Revio_925006_i3.WebP",
        "/public/imgs/frames/extra/Revio_925006_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "revio"
    },
    {
      "pro_id": 1026,
      "pro_name": "Tomhardy 935202",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_935202_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_935202_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_935202_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_935202_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_935202_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1027,
      "pro_name": "Tomhardy jampingjack",
      "pro_price": 559,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1028,
      "pro_name": "Tomhardy jampingjack",
      "pro_price": 559,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1029,
      "pro_name": "Tomhardy jampingjack",
      "pro_price": 559,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1030,
      "pro_name": "Tomhardy library",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1031,
      "pro_name": "Tomhardy library",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1032,
      "pro_name": "Tomhardy realstuff",
      "pro_price": 399,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1033,
      "pro_name": "enfys 10216",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_10216_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_10216_C4_i1.WebP",
        "/public/imgs/frames/enfys/enfys_10216_C4_i2.WebP",
        "/public/imgs/frames/enfys/enfys_10216_C4_i3.WebP",
        "/public/imgs/frames/enfys/enfys_10216_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1034,
      "pro_name": "enfys ACT-TEN",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i2.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i3.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1035,
      "pro_name": "enfys ACT-TEN",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i2.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i3.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1036,
      "pro_name": "enfys DTX118",
      "pro_price": 5600,
      "pro_image": "/public/imgs/frames/enfys/enfys_DTX118_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_DTX118_i1.WebP",
        "/public/imgs/frames/enfys/enfys_DTX118_i2.WebP",
        "/public/imgs/frames/enfys/enfys_DTX118_i3.WebP",
        "/public/imgs/frames/enfys/enfys_DTX118_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1037,
      "pro_name": "enfys DTX124",
      "pro_price": 5699,
      "pro_image": "/public/imgs/frames/enfys/enfys_DTX124_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_DTX124_i1.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_i2.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_i3.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "gold",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "square",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1038,
      "pro_name": "enfys",
      "pro_price": 5499,
      "pro_image": "/public/imgs/frames/enfys/enfys_RLT5892_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i1.WebP",
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i2.WebP",
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i3.WebP",
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1039,
      "pro_name": "enfys VN7122",
      "pro_price": 5499,
      "pro_image": "/public/imgs/frames/enfys/enfys_VN7122_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_VN7122_i1.WebP",
        "/public/imgs/frames/enfys/enfys_VN7122_i2.WebP",
        "/public/imgs/frames/enfys/enfys_VN7122_i3.WebP",
        "/public/imgs/frames/enfys/enfys_VN7122_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "reactangle",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1040,
      "pro_name": "globus 30343",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30343_BROWN_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30343_BROWN_i1.WebP",
        "/public/imgs/frames/extra/GB_30343_BROWN_i2.WebP",
        "/public/imgs/frames/extra/GB_30343_BROWN_i3.WebP",
        "/public/imgs/frames/extra/GB_30343_BROWN_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "cateye",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1041,
      "pro_name": "globus 30414",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30414_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30414_C1_i1.WebP",
        "/public/imgs/frames/extra/GB_30414_C1_i2.WebP",
        "/public/imgs/frames/extra/GB_30414_C1_i3.WebP",
        "/public/imgs/frames/extra/GB_30414_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1042,
      "pro_name": "globus 30414",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30414_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30414_C2_i1.WebP",
        "/public/imgs/frames/extra/GB_30414_C2_i2.WebP",
        "/public/imgs/frames/extra/GB_30414_C2_i3.WebP",
        "/public/imgs/frames/extra/GB_30414_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1043,
      "pro_name": "globus 30414",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30414_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30414_C3_i1.WebP",
        "/public/imgs/frames/extra/GB_30414_C3_i2.WebP",
        "/public/imgs/frames/extra/GB_30414_C3_i3.WebP",
        "/public/imgs/frames/extra/GB_30414_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1044,
      "pro_name": "globus 9201",
      "pro_price": 749,
      "pro_image": "/public/imgs/frames/extra/GO_9201_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GO_9201_C2_i1.WebP",
        "/public/imgs/frames/extra/GO_9201_C2_i2.WebP",
        "/public/imgs/frames/extra/GO_9201_C2_i3.WebP",
        "/public/imgs/frames/extra/GO_9201_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1045,
      "pro_name": "globus 9201",
      "pro_price": 749,
      "pro_image": "/public/imgs/frames/extra/GO_9201_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GO_9201_i1.WebP",
        "/public/imgs/frames/extra/GO_9201_i2.WebP",
        "/public/imgs/frames/extra/GO_9201_i3.WebP",
        "/public/imgs/frames/extra/GO_9201_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1046,
      "pro_name": "wolfeyes 4015",
      "pro_price": 1400,
      "pro_image": "/public/imgs/frames/wolfyeyes/WE_4015_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i1.WebP",
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i2.WebP",
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i3.WebP",
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "wolfeyes"
    },
    {
      "pro_id": 1047,
      "pro_name": "wolfeyes 80016",
      "pro_price": 1400,
      "pro_image": "/public/imgs/frames/wolfyeyes/WE_80016_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i1.WebP",
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i2.WebP",
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i3.WebP",
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "wolfeyes"
    },
    {
      "pro_id": 1048,
      "pro_name": "First time 5E201",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C1_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C1_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.5,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1049,
      "pro_name": "First time 5E201",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E201_C2_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C2_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C2_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1050,
      "pro_name": "First time 5E201",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E201_C3_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C3_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C3_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1051,
      "pro_name": "First time 5E209",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E209_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E209_C1_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E209_C1_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E209_C1_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E209_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1052,
      "pro_name": "First time 5E209",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E209_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E209_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E209_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E209_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E209_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1053,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C1_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C1_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C1_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1054,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C2_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C2_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C2_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1055,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C3_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C3_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C3_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1056,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C4_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C4_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C4_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1057,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova__1006_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova__1006_C1_i1.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C1_i2.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C1_i3.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1058,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova__1006_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova__1006_C2_i1.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C2_i2.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C2_i3.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1059,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C3_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C3_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C3_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1060,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C4_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C4_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C4_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1061,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C5_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C5_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C5_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C5_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C5_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1062,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C6_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C6_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C6_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1063,
      "pro_name": "Leobreeze lbr t003",
      "pro_price": 249,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1064,
      "pro_name": "Leobreeze t002",
      "pro_price": 950,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_t002_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1065,
      "pro_name": "Leobreeze t003",
      "pro_price": 950,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_t003_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1066,
      "pro_name": "Leobreeze t003",
      "pro_price": 950,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_t003_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1067,
      "pro_name": "Tagline 88043",
      "pro_price": 440,
      "pro_image": "/public/imgs/frames/extra/Tagline_88043_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88043_C1_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C1_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C1_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1068,
      "pro_name": "Tagline 88043",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88043_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88043_C2_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C2_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C2_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1069,
      "pro_name": "Tagline 88044",
      "pro_price": 440,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C1_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C1_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C1_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1070,
      "pro_name": "Tagline 88044",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C2_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C2_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C2_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1071,
      "pro_name": "Tagline 88044",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C3_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C3_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C3_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1072,
      "pro_name": "Tagline 88044",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C4_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C4_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C4_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1073,
      "pro_name": "Tagline 98040",
      "pro_price": 380,
      "pro_image": "/public/imgs/frames/extra/Tagline_98040_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_98040_C1_i1.WebP",
        "/public/imgs/frames/extra/Tagline_98040_C1_i2.WebP",
        "/public/imgs/frames/extra/Tagline_98040_C1_i3.WebP",
        "/public/imgs/frames/extra/Tagline_98040_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1074,
      "pro_name": "LBE 144",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/LBE_144_C0_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/LBE_144_C0_i1.WebP",
        "/public/imgs/frames/extra/LBE_144_C0_i2.WebP",
        "/public/imgs/frames/extra/LBE_144_C0_i3.WebP",
        "/public/imgs/frames/extra/LBE_144_C0_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "lbe"
    },
    {
      "pro_id": 1075,
      "pro_name": "YJ 18HF039",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/yj_18HF039_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yj_18HF039_C1_i1.WebP",
        "/public/imgs/frames/extra/yj_18HF039_C1_i2.WebP",
        "/public/imgs/frames/extra/yj_18HF039_C1_i3.WebP",
        "/public/imgs/frames/extra/yj_18HF039_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "yj"
    },
    {
      "pro_id": 1076,
      "pro_name": "YJ 0169",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/yj_0169_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yj_0169_C1_i1.WebP",
        "/public/imgs/frames/extra/yj_0169_C1_i2.WebP",
        "/public/imgs/frames/extra/yj_0169_C1_i3.WebP",
        "/public/imgs/frames/extra/yj_0169_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "yj"
    },
    {
      "pro_id": 1077,
      "pro_name": "YJ 0187",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/yj_0187_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yj_0187_C1_i1.WebP",
        "/public/imgs/frames/extra/yj_0187_C1_i2.WebP",
        "/public/imgs/frames/extra/yj_0187_C1_i3.WebP",
        "/public/imgs/frames/extra/yj_0187_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "yj"
    },
    {
      "pro_id": 1078,
      "pro_name": "Yolo",
      "pro_price": 1249,
      "pro_image": "/public/imgs/frames/extra/yolo_3_C0_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yolo_3_C0_i1.WebP",
        "/public/imgs/frames/extra/yolo_3_C0_i2.WebP",
        "/public/imgs/frames/extra/yolo_3_C0_i3.WebP",
        "/public/imgs/frames/extra/yolo_3_C0_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "yolo"
    },
    {
      "pro_id": 1079,
      "pro_name": "knighthorse",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i1.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i2.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i3.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "knighthorse"
    },
    {
      "pro_id": 1080,
      "pro_name": "knighthorse",
      "pro_price": 1249,
      "pro_image": "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i1.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i2.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i3.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "knighthorse"
    },
    {
      "pro_id": 1081,
      "pro_name": "knighthorse",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i1.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i2.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i3.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "knighthorse"
    },
    {
      "pro_id": 1082,
      "pro_name": "knighthorse",
      "pro_price": 1249,
      "pro_image": "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i1.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i2.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i3.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "knighthorse"
    },
    {
      "pro_id": 1083,
      "pro_name": "knighthorse",
      "pro_price": 1249,
      "pro_image": "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i1.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i2.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i3.WebP",
        "/public/imgs/frames/knighthorse/Knight horse_160506_R450_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "knighthorse"
    }
  ],
  "goggles": [
    {
      "pro_id": 2001,
      "pro_name": "Benhunt c155",
      "pro_price": 1499,
      "pro_image": "/public/imgs/goggles/benhunt_102_C155_W_1499.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2002,
      "pro_name": "Benhunt 120 C2",
      "pro_price": 1900,
      "pro_image": "/public/imgs/goggles/benhunt_120_C2_57_M_1899.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "men",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2003,
      "pro_name": "Benhunt 120 C2",
      "pro_price": 1900,
      "pro_image": "/public/imgs/goggles/benhunt_120_C2_57_M_1899.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2004,
      "pro_name": "Benhunt 1201 C5",
      "pro_price": 1900,
      "pro_image": "/public/imgs/goggles/benhunt_1201_C5_W_1900.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2005,
      "pro_name": "Benhunt 1208 C5",
      "pro_price": 2300,
      "pro_image": "/public/imgs/goggles/benhunt_1208_C5_W_2300.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2006,
      "pro_name": "Benhunt 2849 C1",
      "pro_price": 2300,
      "pro_image": "/public/imgs/goggles/benhunt_2849_C01_M_1600.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "men",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2007,
      "pro_name": "Benhunt 6008 C4",
      "pro_price": 1900,
      "pro_image": "/public/imgs/goggles/benhunt_6008_C4_M_1900.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "men",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2008,
      "pro_name": "Benhunt 6008 C4",
      "pro_price": 1900,
      "pro_image": "/public/imgs/goggles/benhunt_6008_C4_M_1900.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "men",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2009,
      "pro_name": "Benhunt 21001 C3",
      "pro_price": 1300,
      "pro_image": "/public/imgs/goggles/benhunt_21001_C3_W_1300.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2010,
      "pro_name": "Benhunt 21012 C1",
      "pro_price": 1300,
      "pro_image": "/public/imgs/goggles/benhunt_21012_C1_W_1300.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2011,
      "pro_name": "Benhunt 84044 C2",
      "pro_price": 1600,
      "pro_image": "/public/imgs/goggles/benhunt_84044_C2_W_1600.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2012,
      "pro_name": "Benhunt 84044 C2",
      "pro_price": 1600,
      "pro_image": "/public/imgs/goggles/benhunt_84044_C2_W_1600.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    },
    {
      "pro_id": 2013,
      "pro_name": "Benhunt 84046 C1",
      "pro_price": 1500,
      "pro_image": "/public/imgs/goggles/benhunt_84046_C1_W_1500.WebP",
      "pro_images": [],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "aviator",
      "pro_gender": "women",
      "pro_category": "goggle",
      "pro_brand": "benhunt"
    }
  ],
  "reading_glasses": [
    {
      "pro_id": 1001,
      "pro_name": "Enfys RT5897",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_RT5897_C4_i2.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i2.WebP",
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i3.WebP",
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i4.WebP",
        "/public/imgs/frames/enfys/enfys_RT5897_C4_i1.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "black",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_rating": 4.6,
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1002,
      "pro_name": "Tom hardy 66010",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_66010_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_66010_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66010_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66010_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66010_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "yellow",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "rect",
      "pro_gender": "kids",
      "pro_rating": 4.6,
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1003,
      "pro_name": "Tom hardy 66010",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/Tom hardy_66010_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/Tom hardy_66010_C2_i1.WebP",
        "/public/imgs/frames/Tom hardy_66010_C2_i2.WebP",
        "/public/imgs/frames/Tom hardy_66010_C2_i3.WebP",
        "/public/imgs/frames/Tom hardy_66010_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "pink",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1004,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 600,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "green",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1005,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 400,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "orange",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1006,
      "pro_name": "enfys extra",
      "pro_price": 6000,
      "pro_image": "/public/imgs/frames/enfys/enfys I216 C4.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_DTX118_46_01.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_49_02.WebP",
        "/public/imgs/frames/enfys/enfys_DTX118_46_01.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_49_02.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_49_02.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1007,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 400,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i1_C3_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "aqua",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1008,
      "pro_name": "Fashion hunt 9104",
      "pro_price": 400,
      "pro_image": "/public/imgs/frames/extra/Fashionhunt_9104_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i1.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i2.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i3.WebP",
        "/public/imgs/frames/extra/Fashionhunt_9104_C4_i4.WebP"
      ],
      "pro_style": "half_frame",
      "pro_color": "blue",
      "pro_size": "M",
      "pro_material": "plastic",
      "pro_shape": "cateye",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "fashion_hunt"
    },
    {
      "pro_id": 1009,
      "pro_name": "Tom hardy 66009",
      "pro_price": 310,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "aqua",
      "pro_size": "M",
      "pro_rating": 4.7,
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1010,
      "pro_name": "Tom hardy 66009",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_66009_i1_C2.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_66009_i1_C2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_i2_C2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_i3_C2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_66009_i4_C2.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "red",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1011,
      "pro_name": "Tom hardy 66009",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/extra/iMTELER_87605_i1_C1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/iMTELER_87605_i1_C1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_i2_C1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_i3_C1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_i4_C1.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "red",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.7,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1012,
      "pro_name": "Tom hardy 66009",
      "pro_price": 399,
      "pro_image": "/public/imgs/frames/extra/iMTELER_87605_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/iMTELER_87605_C4_i1.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_C4_i2.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_C4_i3.WebP",
        "/public/imgs/frames/extra/iMTELER_87605_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "cateye",
      "pro_rating": 4.7,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "iMTELER"
    },
    {
      "pro_id": 1013,
      "pro_name": "First time 100104",
      "pro_price": 659,
      "pro_image": "/public/imgs/frames/extra/Firsttime_100104_C5_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Firsttime_100104_C5_i1.WebP",
        "/public/imgs/frames/extra/Firsttime_100104_C5_i2.WebP",
        "/public/imgs/frames/extra/Firsttime_100104_C5_i3.WebP",
        "/public/imgs/frames/extra/Firsttime_100104_C5_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1014,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1015,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1016,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C5_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C5_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1017,
      "pro_name": "Flamingo BC9003",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Flamingo_BC9003_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i1.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i2.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i3.WebP",
        "/public/imgs/frames/extra/Flamingo_BC9003_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "square",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "flamingo"
    },
    {
      "pro_id": 1018,
      "pro_name": "Bubbles mini 8602",
      "pro_price": 359,
      "pro_image": "/public/imgs/frames/Bubbles_mini_8602_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/Bubbles_mini_8602_i1.WebP",
        "/public/imgs/frames/Bubbles_mini_8602_i2.WebP",
        "/public/imgs/frames/Bubbles_mini_8602_i3.WebP",
        "/public/imgs/frames/Bubbles_mini_8602_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.9,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "bubbles_mini"
    },
    {
      "pro_id": 1019,
      "pro_name": "Ccuteboyz 26907",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/reading_glasses/Ccuteboyz_26907_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/reading_glasses/Ccuteboyz_26907_i1.WebP",
        "/public/imgs/frames/reading_glasses/Ccuteboyz_26907_i2.WebP",
        "/public/imgs/frames/reading_glasses/Ccuteboyz_26907_i3.WebP",
        "/public/imgs/frames/reading_glasses/Ccuteboyz_26907_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "cateye",
      "pro_rating": 4.9,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "ccuteboyz"
    },
    {
      "pro_id": 1020,
      "pro_name": "Firsttime 1672",
      "pro_price": 660,
      "pro_image": "/public/imgs/frames/extra/Firsttime_1672_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Firsttime_1672_i1.WebP",
        "/public/imgs/frames/extra/Firsttime_1672_i2.WebP",
        "/public/imgs/frames/extra/Firsttime_1672_i3.WebP",
        "/public/imgs/frames/extra/Firsttime_1672_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.5,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1021,
      "pro_name": "LEO MiNi 35012BM",
      "pro_price": 459,
      "pro_image": "/public/imgs/frames/extra/LEO_MiNi_35012BM_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_35012BM.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "leo_mini"
    },
    {
      "pro_id": 1022,
      "pro_name": "LEO MiNi 35037",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/extra/lEO_MINi_35037_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/lEO_MINi_35037_i1.WebP",
        "/public/imgs/frames/extra/lEO_MINi_35037_i2.WebP",
        "/public/imgs/frames/extra/lEO_MINi_35037_i3.WebP",
        "/public/imgs/frames/extra/lEO_MINi_35037_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "cateye",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "leo_mini"
    },
    {
      "pro_id": 1023,
      "pro_name": "LEO MiNi 35037",
      "pro_price": 449,
      "pro_image": "/public/imgs/frames/extra/LEO_MiNi_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/LEO_MiNi_i1.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_i2.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_i3.WebP",
        "/public/imgs/frames/extra/LEO_MiNi_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "ractangle",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "leo_mini"
    },
    {
      "pro_id": 1024,
      "pro_name": "PROSTYLE 9417402",
      "pro_price": 380,
      "pro_image": "/public/imgs/frames/reading_glasses/PROSTYLE_9417402_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/reading_glasses/PROSTYLE_9417402_i1.WebP",
        "/public/imgs/frames/reading_glasses/PROSTYLE_9417402_i2.WebP",
        "/public/imgs/frames/reading_glasses/PROSTYLE_9417402_i3.WebP",
        "/public/imgs/frames/reading_glasses/PROSTYLE_9417402_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "prostyle"
    },
    {
      "pro_id": 1025,
      "pro_name": "Revio 925006",
      "pro_price": 399,
      "pro_image": "/public/imgs/frames/extra/Revio_925006_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Revio_925006_i1.WebP",
        "/public/imgs/frames/extra/Revio_925006_i2.WebP",
        "/public/imgs/frames/extra/Revio_925006_i3.WebP",
        "/public/imgs/frames/extra/Revio_925006_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "revio"
    },
    {
      "pro_id": 1026,
      "pro_name": "Tomhardy 935202",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_935202_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_935202_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_935202_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_935202_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_935202_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1027,
      "pro_name": "Tomhardy jampingjack",
      "pro_price": 559,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1028,
      "pro_name": "Tomhardy jampingjack",
      "pro_price": 559,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_THZE2602_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1029,
      "pro_name": "Tomhardy jampingjack",
      "pro_price": 559,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_jampingjack_TJU009_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1030,
      "pro_name": "Tomhardy library",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1031,
      "pro_name": "Tomhardy library",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_library_55017_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1032,
      "pro_name": "Tomhardy realstuff",
      "pro_price": 399,
      "pro_image": "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i1.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i2.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i3.WebP",
        "/public/imgs/frames/tomhardy/tomhardy_realstuff_935207_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "ractangle",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "tomhardy"
    },
    {
      "pro_id": 1033,
      "pro_name": "enfys 10216",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_10216_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_10216_C4_i1.WebP",
        "/public/imgs/frames/enfys/enfys_10216_C4_i2.WebP",
        "/public/imgs/frames/enfys/enfys_10216_C4_i3.WebP",
        "/public/imgs/frames/enfys/enfys_10216_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1034,
      "pro_name": "enfys ACT-TEN",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i2.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i3.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1035,
      "pro_name": "enfys ACT-TEN",
      "pro_price": 5500,
      "pro_image": "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i1.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i2.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i3.WebP",
        "/public/imgs/frames/enfys/enfys_ACT-TEN_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1036,
      "pro_name": "enfys DTX118",
      "pro_price": 5600,
      "pro_image": "/public/imgs/frames/enfys/enfys_DTX118_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_DTX118_i1.WebP",
        "/public/imgs/frames/enfys/enfys_DTX118_i2.WebP",
        "/public/imgs/frames/enfys/enfys_DTX118_i3.WebP",
        "/public/imgs/frames/enfys/enfys_DTX118_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1037,
      "pro_name": "enfys DTX124",
      "pro_price": 5699,
      "pro_image": "/public/imgs/frames/enfys/enfys_DTX124_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_DTX124_i1.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_i2.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_i3.WebP",
        "/public/imgs/frames/enfys/enfys_DTX124_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "gold",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "square",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1038,
      "pro_name": "enfys",
      "pro_price": 5499,
      "pro_image": "/public/imgs/frames/enfys/enfys_RLT5892_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i1.WebP",
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i2.WebP",
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i3.WebP",
        "/public/imgs/frames/enfys/enfys_RLT5892_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1039,
      "pro_name": "enfys VN7122",
      "pro_price": 5499,
      "pro_image": "/public/imgs/frames/enfys/enfys_VN7122_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/enfys/enfys_VN7122_i1.WebP",
        "/public/imgs/frames/enfys/enfys_VN7122_i2.WebP",
        "/public/imgs/frames/enfys/enfys_VN7122_i3.WebP",
        "/public/imgs/frames/enfys/enfys_VN7122_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "reactangle",
      "pro_rating": 4.9,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "enfys"
    },
    {
      "pro_id": 1040,
      "pro_name": "globus 30343",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30343_BROWN_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30343_BROWN_i1.WebP",
        "/public/imgs/frames/extra/GB_30343_BROWN_i2.WebP",
        "/public/imgs/frames/extra/GB_30343_BROWN_i3.WebP",
        "/public/imgs/frames/extra/GB_30343_BROWN_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "cateye",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1041,
      "pro_name": "globus 30414",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30414_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30414_C1_i1.WebP",
        "/public/imgs/frames/extra/GB_30414_C1_i2.WebP",
        "/public/imgs/frames/extra/GB_30414_C1_i3.WebP",
        "/public/imgs/frames/extra/GB_30414_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1042,
      "pro_name": "globus 30414",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30414_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30414_C2_i1.WebP",
        "/public/imgs/frames/extra/GB_30414_C2_i2.WebP",
        "/public/imgs/frames/extra/GB_30414_C2_i3.WebP",
        "/public/imgs/frames/extra/GB_30414_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1043,
      "pro_name": "globus 30414",
      "pro_price": 1259,
      "pro_image": "/public/imgs/frames/extra/GB_30414_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GB_30414_C3_i1.WebP",
        "/public/imgs/frames/extra/GB_30414_C3_i2.WebP",
        "/public/imgs/frames/extra/GB_30414_C3_i3.WebP",
        "/public/imgs/frames/extra/GB_30414_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1044,
      "pro_name": "globus 9201",
      "pro_price": 749,
      "pro_image": "/public/imgs/frames/extra/GO_9201_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GO_9201_C2_i1.WebP",
        "/public/imgs/frames/extra/GO_9201_C2_i2.WebP",
        "/public/imgs/frames/extra/GO_9201_C2_i3.WebP",
        "/public/imgs/frames/extra/GO_9201_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1045,
      "pro_name": "globus 9201",
      "pro_price": 749,
      "pro_image": "/public/imgs/frames/extra/GO_9201_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/GO_9201_i1.WebP",
        "/public/imgs/frames/extra/GO_9201_i2.WebP",
        "/public/imgs/frames/extra/GO_9201_i3.WebP",
        "/public/imgs/frames/extra/GO_9201_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "globus"
    },
    {
      "pro_id": 1046,
      "pro_name": "wolfeyes 4015",
      "pro_price": 1400,
      "pro_image": "/public/imgs/frames/wolfyeyes/WE_4015_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i1.WebP",
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i2.WebP",
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i3.WebP",
        "/public/imgs/frames/wolfyeyes/WE_4015_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "wolfeyes"
    },
    {
      "pro_id": 1047,
      "pro_name": "wolfeyes 80016",
      "pro_price": 1400,
      "pro_image": "/public/imgs/frames/wolfyeyes/WE_80016_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i1.WebP",
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i2.WebP",
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i3.WebP",
        "/public/imgs/frames/wolfyeyes/WE_80016_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "wolfeyes"
    },
    {
      "pro_id": 1048,
      "pro_name": "First time 5E201",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C1_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C1_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.5,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1049,
      "pro_name": "First time 5E201",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E201_C2_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C2_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C2_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1050,
      "pro_name": "First time 5E201",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E201_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E201_C3_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C3_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C3_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E201_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1051,
      "pro_name": "First time 5E209",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E209_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E209_C1_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E209_C1_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E209_C1_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E209_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1052,
      "pro_name": "First time 5E209",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__5E209_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__5E209_i1.WebP",
        "/public/imgs/frames/extra/first_time__5E209_i2.WebP",
        "/public/imgs/frames/extra/first_time__5E209_i3.WebP",
        "/public/imgs/frames/extra/first_time__5E209_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.6,
      "pro_gender": "kids",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1053,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C1_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C1_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C1_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1054,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C2_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C2_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C2_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1055,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C3_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C3_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C3_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1056,
      "pro_name": "First time 18929",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/first_time__18929_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/first_time__18929_C4_i1.WebP",
        "/public/imgs/frames/extra/first_time__18929_C4_i2.WebP",
        "/public/imgs/frames/extra/first_time__18929_C4_i3.WebP",
        "/public/imgs/frames/extra/first_time__18929_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "first_time"
    },
    {
      "pro_id": 1057,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova__1006_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova__1006_C1_i1.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C1_i2.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C1_i3.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1058,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova__1006_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova__1006_C2_i1.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C2_i2.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C2_i3.WebP",
        "/public/imgs/frames/extra/Seirova__1006_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1059,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C3_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C3_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C3_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "square",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1060,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C4_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C4_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C4_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1061,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C5_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C5_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C5_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C5_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C5_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1062,
      "pro_name": "Seirnova 1006",
      "pro_price": 599,
      "pro_image": "/public/imgs/frames/extra/Seirova_1006_C6_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Seirova_1006_C6_i1.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C6_i2.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C6_i3.WebP",
        "/public/imgs/frames/extra/Seirova_1006_C6_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "seirnova"
    },
    {
      "pro_id": 1063,
      "pro_name": "Leobreeze lbr t003",
      "pro_price": 249,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_lbr_t003_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1064,
      "pro_name": "Leobreeze t002",
      "pro_price": 950,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_t002_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_t002_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1065,
      "pro_name": "Leobreeze t003",
      "pro_price": 950,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_t003_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1066,
      "pro_name": "Leobreeze t003",
      "pro_price": 950,
      "pro_image": "/public/imgs/frames/extra/Leobreeze_t003_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i1.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i2.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i3.WebP",
        "/public/imgs/frames/extra/Leobreeze_t003_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "leobreeze"
    },
    {
      "pro_id": 1067,
      "pro_name": "Tagline 88043",
      "pro_price": 440,
      "pro_image": "/public/imgs/frames/extra/Tagline_88043_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88043_C1_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C1_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C1_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1068,
      "pro_name": "Tagline 88043",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88043_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88043_C2_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C2_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C2_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88043_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1069,
      "pro_name": "Tagline 88044",
      "pro_price": 440,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C1_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C1_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C1_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1070,
      "pro_name": "Tagline 88044",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C2_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C2_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C2_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C2_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C2_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1071,
      "pro_name": "Tagline 88044",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C3_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C3_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C3_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C3_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C3_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1072,
      "pro_name": "Tagline 88044",
      "pro_price": 450,
      "pro_image": "/public/imgs/frames/extra/Tagline_88044_C4_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_88044_C4_i1.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C4_i2.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C4_i3.WebP",
        "/public/imgs/frames/extra/Tagline_88044_C4_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1073,
      "pro_name": "Tagline 98040",
      "pro_price": 380,
      "pro_image": "/public/imgs/frames/extra/Tagline_98040_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/Tagline_98040_C1_i1.WebP",
        "/public/imgs/frames/extra/Tagline_98040_C1_i2.WebP",
        "/public/imgs/frames/extra/Tagline_98040_C1_i3.WebP",
        "/public/imgs/frames/extra/Tagline_98040_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "Fiber",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "tagline"
    },
    {
      "pro_id": 1074,
      "pro_name": "LBE 144",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/LBE_144_C0_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/LBE_144_C0_i1.WebP",
        "/public/imgs/frames/extra/LBE_144_C0_i2.WebP",
        "/public/imgs/frames/extra/LBE_144_C0_i3.WebP",
        "/public/imgs/frames/extra/LBE_144_C0_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "lbe"
    },
    {
      "pro_id": 1075,
      "pro_name": "YJ 18HF039",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/yj_18HF039_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yj_18HF039_C1_i1.WebP",
        "/public/imgs/frames/extra/yj_18HF039_C1_i2.WebP",
        "/public/imgs/frames/extra/yj_18HF039_C1_i3.WebP",
        "/public/imgs/frames/extra/yj_18HF039_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "men",
      "pro_category": "frames",
      "pro_brand": "yj"
    },
    {
      "pro_id": 1076,
      "pro_name": "YJ 0169",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/yj_0169_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yj_0169_C1_i1.WebP",
        "/public/imgs/frames/extra/yj_0169_C1_i2.WebP",
        "/public/imgs/frames/extra/yj_0169_C1_i3.WebP",
        "/public/imgs/frames/extra/yj_0169_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.7,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "yj"
    },
    {
      "pro_id": 1077,
      "pro_name": "YJ 0187",
      "pro_price": 949,
      "pro_image": "/public/imgs/frames/extra/yj_0187_C1_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yj_0187_C1_i1.WebP",
        "/public/imgs/frames/extra/yj_0187_C1_i2.WebP",
        "/public/imgs/frames/extra/yj_0187_C1_i3.WebP",
        "/public/imgs/frames/extra/yj_0187_C1_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "yj"
    },
    {
      "pro_id": 1078,
      "pro_name": "Yolo",
      "pro_price": 1249,
      "pro_image": "/public/imgs/frames/extra/yolo_3_C0_i1.WebP",
      "pro_images": [
        "/public/imgs/frames/extra/yolo_3_C0_i1.WebP",
        "/public/imgs/frames/extra/yolo_3_C0_i2.WebP",
        "/public/imgs/frames/extra/yolo_3_C0_i3.WebP",
        "/public/imgs/frames/extra/yolo_3_C0_i4.WebP"
      ],
      "pro_style": "full_frame",
      "pro_color": "grey",
      "pro_size": "M",
      "pro_material": "metal",
      "pro_shape": "round",
      "pro_rating": 4.8,
      "pro_gender": "women",
      "pro_category": "frames",
      "pro_brand": "yolo"
    }
  ],
  "contactlenses": [
    {
      "pro_id": 4001,
      "pro_name": "Bausch & Lomb ULTRA ONE DAY (5's pack)",
      "pro_price": 650,
      "pro_image": "/public/imgs/contact_lenses/bauch_lomb_ultra_oneday_5pack_i1.WebP",
      "pro_images": [],
      "pro_style": "daily_disposable",
      "pro_material": "plastic",
      "pro_shape": "round",
      "pro_gender": "women",
      "pro_rating": 4.6,
      "pro_category": "frame",
      "pro_brand": "enfys"
    }
  ]
}


def insert_data_to_mongodb():
    try:
        username = urllib.parse.quote_plus("vrajesh")
        password = urllib.parse.quote_plus("Cap123")
        mongo_uri = f"mongodb+srv://{username}:{password}@cluster0.iyga0yz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

        client = MongoClient(mongo_uri)
        db = client['netramoptics']
        frames_collection = db['frames']
        goggles_collection = db['goggles']
        reading_glasses_collection = db['reading_glasses']

        # ✅ Remove all old data first
        frames_collection.delete_many({})
        goggles_collection.delete_many({})
        reading_glasses_collection.delete_many({})

        # ✅ Insert new data
        if data['frames']:
            if all(isinstance(doc, dict) for doc in data['frames']):
                frames_collection.insert_many(data['frames'])
                print(f"Inserted {len(data['frames'])} documents into 'frames' collection.")
            else:
                print("❌ 'frames' contains non-dict items.")

        if data['goggles']:
            if all(isinstance(doc, dict) for doc in data['goggles']):
                goggles_collection.insert_many(data['goggles'])
                print(f"Inserted {len(data['goggles'])} documents into 'goggles' collection.")
            else:
                print("❌ 'goggles' contains non-dict items.")

        if data['reading_glasses']:
            if all(isinstance(doc, dict) for doc in data['reading_glasses']):
                reading_glasses_collection.insert_many(data['reading_glasses'])
                print(f"Inserted {len(data['reading_glasses'])} documents into 'reading_glasses' collection.")
            else:
                print("❌ 'reading_glasses' contains non-dict items.")

        client.close()
        print("✅ MongoDB connection closed.")

    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    insert_data_to_mongodb()