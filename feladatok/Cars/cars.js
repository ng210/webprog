const _carData =
`brand;model;type;price;engine;power;topSpeed;img
Tesla;Model S;Sedan;79999; Electric;670;250;https://evadatbazis.hu/wp-content/uploads/2024/04/Tesla_Model_S_2016-01@2x.jpg
BMW;3 Series;Sedan;45900;Petrol;320;250;https://crdms.images.consumerreports.org/c_lfill,w_563,q_auto,f_auto/prod/cars/chrome/white/2023BMC220012_1280_01
Audi;A3;Hatchback;29900;Diesel;150;220;https://imgd.aeplcdn.com/370x208/n/cw/ec/47030/new-a3-exterior-right-front-three-quarter-6.jpeg
Mercedes-Benz;E-Class;Sedan;54900;Hybrid;292;250;https://images.pexels.com/photos/17233277/pexels-photo-17233277.jpeg
Porsche;911;Coupe;99900;Petrol;450;300;https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/03/1062514-13.jpg
Toyota;Prius;Hybrid;24900;Hybrid;122;180;https://global.toyota/pages/news/images/2022/11/16/1345/001.jpg
Ford;Mustang;Coupe;55900;Petrol;450;250;https://imgd.aeplcdn.com/664x374/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg
Volkswagen;Golf;Hatchback;23900;Diesel;115;200;https://autodesignmagazine.com/wp-content/uploads/2019/10/2019102501_VW_Golf.jpg
Honda;Accord;Sedan;27900;Petrol;190;210;https://www.usnews.com/object/image/00000194-668e-de9a-a5fe-e6fe073a0000/usnpx-2025hondaaccordhybrid-angularfront-zd.jpg
Nissan;Qashqai;SUV;31900;Diesel;130;180;https://dbhdyzvm8lm25.cloudfront.net/stills_0640_png/MY2021/14963/14963_st0640_116.png
Mazda;6;Sedan;29900;Petrol;165;210;https://imgcdn.oto.com.sg/large/gallery/color/3/31/mazda-6-sedan-color-145469.jpg
Kia;Sportage;SUV;24900;Petrol;135;190;https://hips.hearstapps.com/hmg-prod/images/2025-kia-sportage-102-66a9293d9649c.jpg
Peugeot;508;Sedan;31900;Diesel;180;200;https://autodesignmagazine.com/wp-content/uploads/2018/02/2018022301_peugeot_508.jpg
Ferrari;488;Coupe;259000;Petrol;670;330;https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/6f3ea6f9-a3da-416c-a0a4-801afad17370/ed38e024-540c-44a9-9436-5443c2708ae5.png
Lamborghini;Huracan;Coupe;249000;Petrol;610;325;https://stimg.cardekho.com/images/carexteriorimages/930x620/Lamborghini/Huracan-EVO/10643/1690010999692/front-left-side-47.jpg
BMW;X5;SUV;69900;Diesel;400;250;https://hips.hearstapps.com/hmg-prod/images/2025-bmw-x5-xdrive40i-119-6824bd515c0cc.jpg
Audi;Q5;SUV;47900;Petrol;252;240;https://www.usnews.com/object/image/00000199-174e-d59e-a999-d76e71190000/2025-audi-q5-front-angle-view-ak.jpg
Mercedes-Benz;GLC;SUV;59900;Hybrid;320;250;https://autoimage.capitalone.com/cms/Auto/assets/images/2749-hero-2023-mercedes-benz-glc-300.jpg
Toyota;Land Cruiser;SUV;84900;Diesel;200;180;https://global.toyota/pages/models/images/landcruiser/landcruiser_ogp_02.jpg
Ford;Edge;SUV;39900;Petrol;250;220;https://media.ed.edmunds-media.com/ford/edge/2013/oem/2013_ford_edge_4dr-suv_limited_fq_oem_1_300.jpg
Volkswagen;Tiguan;SUV;34900;Diesel;150;200;https://cms-assets.autoscout24.com/uaddx06iwzdz/4CYdxBw0dzOVbreeo2cn9C/16c5b2d1efd3cf20b1704e6977f2251d/vw-tiguan-l-01.jpg
Honda;CR-V;SUV;32900;Hybrid;184;190;https://www.honda.hu/content/dam/central/cars/cr-v-hybrid-suv/accessories/2024-CR-V-Aero-Pack-FR-PHEV-CR1812-08E0P-3A0-AERPE.jpg/_jcr_content/renditions/fb.jpg
Nissan;X-Trail;SUV;35900;Diesel;177;200;https://img.hasznaltautocdn.com/2048x1536/20663220/636507.jpg
Mazda;CX-5;SUV;37900;Petrol;165;210;https://katalogusimg.hasznaltautocdn.com/0545912.jpg
Kia;Niro;SUV;29900;Hybrid;141;180;https://www.kia.com/content/dam/kwcms/kme/global/en/assets/vehicles/niro-sg2/discover/kia-niro-my23-other-models-sportage-phev-gtl-767x384.png
Peugeot;3008;SUV;31900;Diesel;180;200;https://img.hvg.hu/Img/b2dea50fcee14f6eb810034566fbfb2e/d3139cc1-5b71-4936-a592-be5fd4ad03b1.jpg
Ferrari;Portofino;Convertible;215000;Petrol;600;320;https://images.dealer.com/ddc/vehicles/2023/Ferrari/Portofino%20M/Convertible/color/Argento%20Nurburgring%20Metallic-ARG-207,208,207-640-en_US.jpg
Lamborghini;Aventador;Coupe;399000;Petrol;690;350;https://fox59.com/wp-content/uploads/sites/21/2018/08/s097746070.jpg
BMW;Z4;Convertible;49900;Petrol;258;240;https://www.bmw.hu/content/dam/bmw/common/all-models/m-series/bmw-z4-m40i/2025/navigation/bmw-z-series-z4-m40i-roadster-modelfinder.png
Audi;TT;Coupe;45900;Petrol;230;250;https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Audi_TT_1.8T_quattro_2000.jpg/1200px-Audi_TT_1.8T_quattro_2000.jpg
Mercedes-Benz;SLK;Convertible;53900;Petrol;306;260;https://imgd.aeplcdn.com/664x374/ec/73/66/10819/img/m/Mercedes-Benz-SLK-Class-Right-Front-Three-Quarter-50671_ol.jpg`;