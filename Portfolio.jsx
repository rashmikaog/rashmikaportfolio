import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  useContext,
  createContext,
} from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Code2,
  Database,
  Layers,
  Gauge,
  GitBranch,
  PenTool,
  Play,
  CircleDot,
  GraduationCap,
  Copy,
  Check,
  ArrowUp,
} from "lucide-react";

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------- */

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
];

const TECH_ICONS = {
  react: { viewBox: "0 0 24 24", path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" },
  nextjs: { viewBox: "0 0 24 24", path: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" },
  typescript: { viewBox: "0 0 24 24", path: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" },
  nodejs: { viewBox: "0 0 24 24", path: "M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" },
  express: { viewBox: "0 0 24 24", path: "M12.262 16.666h1.146l6.975-9.325H19.22zm9.778 1.441v.004l-4.334-5.706-.557.74 4.873 6.682H.945V4.173h9.505l5.026 6.7.574-.772-4.374-5.928h.003l-.719-.945H0v17.544h24zM10.917 8.705a3.8 3.8 0 0 0-1.292-1.183q-.796-.45-1.916-.45c-.746 0-1.37.14-1.906.424a3.76 3.76 0 0 0-1.31 1.12 4.9 4.9 0 0 0-.75 1.581 7.17 7.17 0 0 0 0 3.696c.148.567.402 1.101.75 1.573a3.5 3.5 0 0 0 1.31 1.066q.803.39 1.906.389 1.77 0 2.739-.868.966-.867 1.328-2.457h-1.139q-.271 1.084-.977 1.734-.704.651-1.952.65-.812 0-1.392-.342a3.1 3.1 0 0 1-.957-.869 3.5 3.5 0 0 1-.551-1.182 5 5 0 0 1-.17-1.133 9 9 0 0 0-.015-.286 4.5 4.5 0 0 1 .015-.829c.047-.418.147-.83.296-1.223A3.7 3.7 0 0 1 5.54 9.05a2.9 2.9 0 0 1 .922-.742q.541-.28 1.246-.28c.47 0 .869.093 1.23.28q.541.281.922.742.379.461.587 1.057t.225 1.246H5.625l.004.957h6.182a7.3 7.3 0 0 0-.18-1.924 4.9 4.9 0 0 0-.715-1.68z" },
  postgresql: { viewBox: "0 0 24 24", path: "M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" },
  mysql: { viewBox: "0 0 24 24", path: "M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z" },
  supabase: { viewBox: "0 0 24 24", path: "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" },
  tailwindcss: { viewBox: "0 0 24 24", path: "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" },
  php: { viewBox: "0 0 24 24", path: "M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z" },
  git: { viewBox: "0 0 24 24", path: "M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z" },
  java: { viewBox: "0 0 128 128", path: "M47.617 98.12c-19.192 5.362 11.677 16.439 36.115 5.969-4.003-1.556-6.874-3.351-6.874-3.351-10.897 2.06-15.952 2.222-25.844 1.092-8.164-.935-3.397-3.71-3.397-3.71zm33.189-10.46c-14.444 2.779-22.787 2.69-33.354 1.6-8.171-.845-2.822-4.805-2.822-4.805-21.137 7.016 11.767 14.977 41.309 6.336-3.14-1.106-5.133-3.131-5.133-3.131zm11.319-60.575c.001 0-42.731 10.669-22.323 34.187 6.024 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.634-29.58zm9.998 81.144s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.095.171-4.45-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.952-3.487-32.013 6.85-13.742 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM85 77.896c2.395-1.634 5.703-3.053 5.703-3.053s-9.424 1.685-18.813 2.474c-11.494.964-23.823 1.154-30.012.326-14.652-1.959 8.033-7.348 8.033-7.348s-8.812-.596-19.644 4.644C17.455 81.134 61.958 83.958 85 77.896zm5.609 15.145c-.108.29-.468.616-.468.616 31.273-8.221 19.775-28.979 4.822-23.725-1.312.464-2 1.543-2 1.543s.829-.334 2.678-.72c7.559-1.575 18.389 10.119-5.032 22.286zM64.181 70.069c-4.614-10.429-20.26-19.553.007-35.559C89.459 14.563 76.492 1.587 76.492 1.587c5.23 20.608-18.451 26.833-26.999 39.667-5.821 8.745 2.857 18.142 14.688 28.815zm27.274 51.748c-19.187 3.612-42.854 3.191-56.887.874 0 0 2.874 2.38 17.646 3.331 22.476 1.437 57-.8 57.816-11.436.001 0-1.57 4.032-18.575 7.231z" },
};

const STACK = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Express.js", icon: "express" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "Supabase", icon: "supabase" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Java", icon: "java" },
  { name: "PHP", icon: "php" },
  { name: "Git", icon: "git" },
];

function TechIcon({ slug, className = '' }) {
  const icon = TECH_ICONS[slug];
  if (!icon) return null;
  return (
    <svg viewBox={icon.viewBox} className={className} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

const QUEUE = [
  { name: "Roadmap Learning Platform", meta: "Next.js · Supabase", status: "Live" },
  { name: "MediCare Plus", meta: "PHP · MySQL", status: "Live" },
  { name: "Bookshop Management System", meta: "Java · Swing", status: "Desktop" },
];

const STEPS = [
  {
    icon: PenTool,
    title: "Plan & design",
    desc: "Map the problem, sketch the UI in Figma, and define a schema before a line of code is written.",
  },
  {
    icon: Code2,
    title: "Build & integrate",
    desc: "Ship responsive interfaces, REST APIs, and database logic with clean, typed, maintainable code.",
  },
  {
    icon: GitBranch,
    title: "Ship & iterate",
    desc: "Deploy to Vercel or Netlify, gather feedback, and keep refining performance and UX.",
  },
];

const FEATURES = [
  {
    icon: Layers,
    title: "Full-stack development",
    desc: "Comfortable across the whole stack, from React interfaces to Node APIs to PostgreSQL schemas.",
  },
  {
    icon: Database,
    title: "Database design",
    desc: "Designs relational schemas that stay clean and query-efficient as an app grows.",
  },
  {
    icon: Gauge,
    title: "Performance-minded",
    desc: "Cares about load times and responsiveness as much as feature completeness.",
  },
  {
    icon: Sparkles,
    title: "Clean, typed code",
    desc: "Writes maintainable TypeScript and JavaScript that's easy for a team to pick up.",
  },
  {
    icon: GitBranch,
    title: "Git-first workflow",
    desc: "Comfortable collaborating through branches, pull requests, and code review.",
  },
  {
    icon: Code2,
    title: "Continuous learner",
    desc: "Currently deepening system design, auth & security, and modern backend patterns.",
  },
];

const SKILL_GROUPS = [
  { title: "Frontend", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "Supabase", "Firebase (basic)"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Vercel", "Netlify"] },
];

const PROJECTS = [
  {
    name: "Roadmap Learning Platform",
    desc: "A modern learning platform designed to help Sri Lankan O/L and A/L students follow structured learning paths, access educational resources, and monitor their progress through an intuitive interface.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Tailwind CSS"],
  },
  {
    name: "ArgiLease",
    desc: "An agricultural equipment leasing platform that connects equipment owners with farmers through a streamlined rental management system, making it easier to list, discover, and lease farming equipment.",
    stack: ["Java", "MySQL"],
  },
  {
    name: "TechCare Services",
    desc: "A native Android application that simplifies the device repair process by allowing users to book repairs, monitor repair progress, browse available services, and manage their accounts.",
    stack: ["Java", "Android", "SQLite"],
  },
  {
    name: "The Little Book Haven",
    desc: "A desktop bookstore management system featuring inventory control, supplier management, sales tracking, and role-based access for administrators and cashiers.",
    stack: ["Java", "Swing"],
  },
  {
    name: "LibGDX Game",
    desc: "A 2D Java game currently under development featuring custom menus, game state management, sprite animation, and a scalable architecture designed for future expansion.",
    stack: ["Java", "LibGDX"],
  },
  {
    name: "Furniture Ordering System",
    desc: "A menu-driven desktop application built in C++ that allows users to browse products, manage furniture inventory, authenticate users, and place customer orders.",
    stack: ["C++"],
  },
  {
    name: "Municipal Service Database",
    desc: "A relational database solution designed to manage municipal services, including citizen records, utility accounts, complaints, emergency incidents, and public service operations.",
    stack: ["SQL", "MySQL"],
  },
];

const EDUCATION = [
  {
    degree: "HD in Computing and Software Engineering",
    org: "AOG Campus",
    period: "2026",
    status: "Ongoing",
    note: "Currently deepening system design, databases, and software engineering practice.",
  },
  {
    degree: "Foundation in Computing and Software Engineering",
    org: "AOG Campus",
    period: "2024",
    status: "Completed",
    note: "Core programming, web fundamentals, and computing theory.",
  },
  {
    degree: "Business and Information Technology",
    org: "AOG Campus",
    period: "2023",
    status: "Completed",
    note: "Foundations in IT systems and business computing.",
  },
];

const COURSEWORK = [
  "Object-Oriented Programming", "Database Design & Development", "Computer Networks",
  "System Analysis & Design", "Software Engineering", "Professional Practice",
];

/* ------------------------------------------------------------------
   UI STATE — reducer + context (avoids prop-drilling through the tree)
------------------------------------------------------------------- */

const initialUIState = {
  menuOpen: false,
  techFilter: null,
  copied: false,
};

function uiReducer(state, action) {
  switch (action.type) {
    case "SET_MENU":
      return { ...state, menuOpen: action.value };
    case "TOGGLE_MENU":
      return { ...state, menuOpen: !state.menuOpen };
    case "SET_TECH_FILTER":
      return { ...state, techFilter: state.techFilter === action.value ? null : action.value };
    case "SET_COPIED":
      return { ...state, copied: action.value };
    default:
      return state;
  }
}

const UIContext = createContext(null);

function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIContext.Provider");
  return ctx;
}

/* ------------------------------------------------------------------
   HOOKS & PRIMITIVES
------------------------------------------------------------------- */

// Small editorial kicker used above section headings — minimal typewriter-mono
// tracked label with a small accent mark, instead of a heavier display font.
function Eyebrow({ children, className = "", tone = "dark" }) {
  const toneClass = tone === "light" ? "text-white/50" : "text-black/45";
  return (
    <p className={`font-mono uppercase tracking-[0.2em] text-[11px] sm:text-xs font-medium ${toneClass} ${className}`}>
      <span className="inline-block w-1.5 h-1.5 rounded-full accent-bg mr-2 -translate-y-0.5" />
      {children}
    </p>
  );
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

// Tracks scroll position as a 0-100 percentage for the top progress bar.
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      setProgress(scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

// Uses IntersectionObserver per-section to know which nav item is "active" while scrolling.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);
  return active;
}


// Subtle scroll parallax: shifts an element vertically as the page scrolls,
// writing directly to its transform so it never triggers a React re-render.
function useParallax(speed = 0.12, max = 60) {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = Math.min(window.scrollY * speed, max);
      ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, max]);
  return ref;
}

// Custom themed cursor: a small solid dot plus a ring that eases toward it,
// both blended with mix-blend-mode so they invert cleanly over black or white.
// Only activates on fine-pointer (mouse) devices — touch is left alone.
// Custom themed cursor: a soft, blurred red dot that eases toward the mouse
// and fades to a dimmer glow when the cursor stops moving. Only activates
// on fine-pointer (mouse) devices.
function CustomCursor() {
  const glowRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setActive(true);
    document.body.style.cursor = "none";

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let rafId;
    let idleTimeout;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glowRef.current?.classList.remove("cursor-idle");
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => glowRef.current?.classList.add("cursor-idle"), 250);
    };
    const tick = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      clearTimeout(idleTimeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!active) return null;

  return <div ref={glowRef} className="cursor-glow" />;
}


// Small physics-ish "magnetic" button: nudges toward the cursor on hover, springs back on leave.
function Magnetic({ as: Tag = "button", className = "", children, strength = 14, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const resting = pos.x === 0 && pos.y === 0;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * strength;
    const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * strength;
    setPos({ x, y });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: resting ? "transform 0.45s cubic-bezier(0.16,1,0.3,1)" : "transform 0.08s linear",
      }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

function StatusPill({ status }) {
  const isActive = status === "Live" || status === "Ongoing";
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-black/10 bg-black/[0.03] text-black/70 shrink-0">
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "accent-bg animate-pulse" : "bg-black/30"}`} />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------
   MEMOIZED PRESENTATIONAL COMPONENTS
   Pulled out of their parent's render + wrapped in React.memo so a
   filter/query keystroke only re-renders the cards actually affected.
------------------------------------------------------------------- */

const FeatureCard = React.memo(function FeatureCard({ feature, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="card-lift bg-white border border-black/10 rounded-2xl p-6 h-full">
        <span className="w-10 h-10 rounded-lg bg-black/[0.04] flex items-center justify-center mb-4">
          <feature.icon size={18} className="text-black/70" />
        </span>
        <h3 className="font-semibold text-base mb-1.5">{feature.title}</h3>
        <p className="text-sm text-black/55 leading-relaxed">{feature.desc}</p>
      </div>
    </Reveal>
  );
});

const SkillGroupCard = React.memo(function SkillGroupCard({ group, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white border border-black/10 rounded-2xl p-5 h-full">
        <h4 className="font-semibold text-sm mb-3">{group.title}</h4>
        <div className="flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <span key={item} className="text-[11px] font-medium bg-black/[0.04] rounded-full px-2.5 py-1 text-black/65">
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
});

// Abstract, monochrome "preview" for each project card since there are no
// real screenshots — a rotating set of subtle CSS patterns plus a large
// faint serif index number, so the grid still reads as visually rich.
const THUMB_PATTERNS = [
  { backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.07) 0 2px, transparent 2px 14px)" },
  { backgroundImage: "radial-gradient(rgba(0,0,0,0.14) 1px, transparent 1.5px)", backgroundSize: "14px 14px" },
  { backgroundImage: "repeating-radial-gradient(circle at 25% 35%, rgba(0,0,0,0.08) 0 2px, transparent 2px 18px)" },
  {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
    backgroundSize: "16px 16px",
  },
];

function ProjectThumbnail({ index }) {
  return (
    <div className="relative h-32 sm:h-36 rounded-xl border border-black/8 bg-black/[0.015] overflow-hidden mb-5">
      <div className="absolute inset-0" style={THUMB_PATTERNS[index % THUMB_PATTERNS.length]} />
      <span className="absolute -bottom-3 right-3 font-serif italic text-black/10 text-7xl leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

const ProjectCard = React.memo(function ProjectCard({ project, delay, index }) {
  const { state, dispatch } = useUI();
  return (
    <Reveal delay={delay}>
      <div className="card-lift bg-white border border-black/10 rounded-2xl p-6 sm:p-7 h-full flex flex-col">
        <ProjectThumbnail index={index} />
        <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
        <p className="text-sm text-black/55 leading-relaxed flex-1">{project.desc}</p>
        <div className="mt-5 pt-4 border-t border-black/8">
          <p className="text-[11px] font-medium tracking-widest text-black/35 uppercase mb-2">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <button
                key={tech}
                onClick={() => dispatch({ type: "SET_TECH_FILTER", value: tech })}
                className={`chip text-[11px] font-mono border rounded-full px-2.5 py-1 ${
                  state.techFilter === tech
                    ? "accent-bg text-white accent-border"
                    : "border-black/10 text-black/60 hover:border-black/25"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
});

const EducationCard = React.memo(function EducationCard({ edu, delay, isLast }) {
  return (
    <Reveal delay={delay} className={`relative ${isLast ? "" : "pb-9"}`}>
      <span
        className={`absolute -left-9 top-0.5 w-7 h-7 rounded-full border flex items-center justify-center ${
          edu.status === "Ongoing" ? "bg-black border-black" : "bg-white border-black/15"
        }`}
      >
        <GraduationCap size={13} className={edu.status === "Ongoing" ? "text-white" : "text-black/50"} />
      </span>
      <div className="card-lift bg-white border border-black/10 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="font-semibold text-base leading-snug">{edu.degree}</h3>
          <StatusPill status={edu.status} />
        </div>
        <p className="text-sm text-black/55">
          {edu.org} <span className="text-black/30">·</span> <span className="font-mono text-xs">{edu.period}</span>
        </p>
        <p className="text-sm text-black/50 leading-relaxed mt-2.5">{edu.note}</p>
      </div>
    </Reveal>
  );
});

/* ------------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------------- */

export default function Portfolio() {
  // Centralized UI state via reducer instead of scattered useState calls —
  // every child reads/dispatches through the UIContext below.
  const [state, dispatch] = useReducer(uiReducer, initialUIState);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const navIds = useMemo(() => NAV.map((n) => n.id), []);
  const activeSection = useActiveSection(navIds);
  const progress = useScrollProgress();
  const heroRef = useRef(null);
  const parallaxRef = useParallax(0.12, 40);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setLoaded(true), 60);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const scrollTo = useCallback((id) => {
    dispatch({ type: "SET_MENU", value: false });
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const allTech = useMemo(
    () => Array.from(new Set(PROJECTS.flatMap((p) => p.stack))).sort(),
    []
  );

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => !state.techFilter || p.stack.includes(state.techFilter));
  }, [state.techFilter]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard?.writeText("kmrashh07@gmail.com").then(() => {
      dispatch({ type: "SET_COPIED", value: true });
      setTimeout(() => dispatch({ type: "SET_COPIED", value: false }), 2000);
    });
  }, []);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <UIContext.Provider value={contextValue}>
    <div className="min-h-screen bg-white text-black antialiased overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400;1,9..144,500&display=swap');
        :root { --accent: #C1272D; }
        ::selection { background: var(--accent); color: #fff; }
        .accent-bg { background-color: var(--accent); }
        .accent-text { color: var(--accent); }
        .accent-border { border-color: var(--accent); }
        .hover-accent:hover { color: var(--accent); }
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'Courier Prime', monospace; letter-spacing: 0.02em; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes blink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .type-cursor {
          display: inline-block;
          width: 3px;
          margin-left: 6px;
          background: var(--accent);
          animation: blink 1s step-end infinite;
        }
        .anim-in { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .float-card { animation: float 6s ease-in-out infinite; }
        .marquee-track { animation: marquee 22s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        .btn-primary {
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
        }
        .btn-primary:hover { box-shadow: 0 10px 24px rgba(0,0,0,0.18); }
        .btn-outline { transition: background 0.2s, color 0.2s, border-color 0.2s; }
        .btn-outline-accent:hover { background-color: var(--accent); border-color: var(--accent); color: #fff; }

        .card-lift { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.18); }

        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; left: 50%; bottom: -6px; height: 2px; width: 0;
          background: var(--accent); transition: width 0.35s cubic-bezier(0.34,1.56,0.64,1);
          transform: translateX(-50%);
        }
        .nav-link:hover::after, .nav-link.is-active::after { width: 100%; }

        .chip { transition: background 0.2s, color 0.2s, border-color 0.2s; }

        .timeline-line {
          background: linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.05));
        }

        .cursor-glow {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 100;
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(193,39,45,0.85) 0%, rgba(193,39,45,0.35) 45%, transparent 75%);
          filter: blur(3px);
          opacity: 0.9;
          will-change: transform, opacity;
          transition: opacity 0.6s ease;
        }
        .cursor-glow.cursor-idle {
          opacity: 0.3;
        }
        @media (pointer: coarse) {
          .cursor-glow { display: none; }
        }
      `}</style>

      <CustomCursor />

      {/* ---------------- SCROLL PROGRESS ---------------- */}
      <div className="fixed top-0 left-0 right-0 z-[80] h-[2.5px] bg-transparent">
        <div
          className="h-full accent-bg transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ---------------- NAV ---------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/85 backdrop-blur-md border-b border-black/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <button onClick={() => scrollTo("top")} className="font-bold text-lg tracking-tight">
            Rashmika
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`nav-link text-sm font-medium transition-colors duration-200 ${
                  activeSection === n.id ? "is-active accent-text" : "text-black/70 hover-accent"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <Magnetic
              onClick={() => scrollTo("contact")}
              className="btn-primary bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full"
            >
              Get in touch
            </Magnetic>
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => dispatch({ type: "TOGGLE_MENU" })}
            aria-label="Toggle menu"
          >
            {state.menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            state.menuOpen ? "max-h-72 border-t border-black/10 mt-4" : "max-h-0"
          }`}
        >
          <div className="bg-white px-6 py-3">
            {[...NAV, { id: "contact", label: "Contact" }].map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`block w-full text-left py-3 text-sm font-medium border-b border-black/5 last:border-0 transition-colors ${
                  activeSection === n.id ? "accent-text" : "text-black/70 hover-accent"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" ref={heroRef} className="relative pt-36 pb-20 px-6 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          <h1
            className={`font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-6xl md:text-7xl ${loaded ? "anim-in" : "opacity-0"}`}
            style={{ animationDelay: "80ms" }}
          >
            Full-stack developer
            <br />
            building{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-white px-2">clean, scalable</span>
              <span className="absolute inset-0 accent-bg rounded-lg -rotate-1" />
            </span>{" "}
            <span className="whitespace-nowrap">
              web apps.
              <span className="type-cursor h-[0.8em] align-middle" aria-hidden="true" />
            </span>
          </h1>

          <p
            className={`text-black/60 max-w-xl mx-auto mt-6 text-base sm:text-lg leading-relaxed ${loaded ? "anim-in" : "opacity-0"}`}
            style={{ animationDelay: "160ms" }}
          >
            Software engineering student from Sri Lanka, focused on clean code,
            performance, and real user experience — from React interfaces to
            PostgreSQL schemas.
          </p>

          <div
            className={`flex flex-wrap items-center justify-center gap-3 mt-9 ${loaded ? "anim-in" : "opacity-0"}`}
            style={{ animationDelay: "240ms" }}
          >
            <Magnetic
              onClick={() => scrollTo("work")}
              className="btn-primary inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 rounded-full text-sm font-medium"
            >
              View my work <ArrowUpRight size={16} />
            </Magnetic>
            <Magnetic
              onClick={() => scrollTo("contact")}
              className="btn-outline btn-outline-accent inline-flex items-center gap-2 border border-black/15 px-6 py-3.5 rounded-full text-sm font-medium"
            >
              <Play size={14} /> Get in touch
            </Magnetic>
          </div>

          <p className={`text-xs text-black/40 mt-5 ${loaded ? "anim-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
            {EDUCATION[0].degree} · Sri Lanka
          </p>
        </div>

        {/* Floating dashboard mockup */}
        <Reveal delay={100} className="max-w-3xl mx-auto mt-16">
          <div ref={parallaxRef}>
          <div className="float-card rounded-2xl border border-black/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/10 bg-black/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
              <span className="ml-3 text-xs font-mono text-black/40">rashmika.dev/projects</span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-sm">Project queue</p>
                  <p className="text-xs text-black/40 mt-0.5">3 projects · last synced 2 min ago</p>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-medium px-3 py-2 rounded-full">
                  <Sparkles size={13} /> Build new
                </span>
              </div>
              <div className="space-y-2.5">
                {QUEUE.map((q) => (
                  <div
                    key={q.name}
                    className="flex items-center justify-between rounded-xl border border-black/8 px-4 py-3 hover:border-black/20 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center shrink-0">
                        <CircleDot size={14} className="text-black/50" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{q.name}</p>
                        <p className="text-xs text-black/40 font-mono truncate">{q.meta}</p>
                      </div>
                    </div>
                    <StatusPill status={q.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </Reveal>

        {/* Tech marquee */}
        <Reveal delay={150} className="max-w-4xl mx-auto mt-14">
          <Eyebrow className="text-center mb-5">Core stack</Eyebrow>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee-track flex gap-9 w-max items-center">
              {[...STACK, ...STACK].map((tech, i) => (
                <span
                  key={i}
                  title={tech.name}
                  aria-label={tech.name}
                  className="flex items-center justify-center shrink-0"
                >
                  <TechIcon slug={tech.icon} className="w-8 h-8 text-black/75" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="px-6 sm:px-8 py-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow className="mb-3">About</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              From idea to deployment.
            </h2>
            <p className="text-black/60 mt-4 leading-relaxed">
              I enjoy transforming ideas into real-world applications — building
              responsive interfaces, scalable backends, and efficient database
              solutions, then shipping and refining them.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="relative">
                  {i < STEPS.length - 1 && (
                    <span className="hidden sm:block absolute top-6 left-[calc(100%+10px)] w-[calc(100%-20px)] h-px bg-black/10" />
                  )}
                  <div className="card-lift border border-black/10 rounded-2xl p-6 h-full bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                        <step.icon size={18} />
                      </span>
                      <span className="font-mono text-xs text-black/30">0{i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-base mb-1.5">{step.title}</h3>
                    <p className="text-sm text-black/55 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SKILLS / FEATURES ---------------- */}
      <section id="skills" className="px-6 sm:px-8 py-24 border-t border-black/10 bg-black/[0.02]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow className="mb-3">What I bring</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Engineered for real-world use.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} delay={(i % 3) * 100} />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILL_GROUPS.map((group, i) => (
              <SkillGroupCard key={group.title} group={group} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WORK ---------------- */}
      <section id="work" className="px-6 sm:px-8 py-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <Eyebrow className="mb-3">Selected work</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured projects.</h2>
          </Reveal>

          <Reveal delay={80} className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <button
              onClick={() => dispatch({ type: "SET_TECH_FILTER", value: null })}
              className={`chip text-xs font-medium px-3 py-1.5 rounded-full border ${
                state.techFilter === null ? "accent-bg text-white accent-border" : "border-black/10 text-black/60 hover:border-black/25"
              }`}
            >
              All
            </button>
            {allTech.map((tech) => (
              <button
                key={tech}
                onClick={() => dispatch({ type: "SET_TECH_FILTER", value: tech })}
                className={`chip text-xs font-medium px-3 py-1.5 rounded-full border ${
                  state.techFilter === tech ? "accent-bg text-white accent-border" : "border-black/10 text-black/60 hover:border-black/25"
                }`}
              >
                {tech}
              </button>
            ))}
          </Reveal>
          <p className="text-center text-xs text-black/35 mb-12">
            Showing {filteredProjects.length} of {PROJECTS.length} projects
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.name} project={p} delay={(i % 4) * 90} index={i} />
            ))}
            {filteredProjects.length === 0 && (
              <p className="col-span-2 text-center text-sm text-black/40 py-10">
                No projects match that search yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- EDUCATION ---------------- */}
      <section id="education" className="px-6 sm:px-8 py-24 border-t border-black/10 bg-black/[0.02]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-12">
            <Eyebrow className="mb-3">Education</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug max-w-2xl">
              Academic background.
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-3">
              <div className="relative pl-9">
                <span className="timeline-line absolute left-[13px] top-2 bottom-2 w-px" />
                {EDUCATION.map((edu, i) => (
                  <EducationCard key={edu.degree} edu={edu} delay={i * 110} isLast={i === EDUCATION.length - 1} />
                ))}
              </div>
            </div>

            {/* Coursework */}
            <div className="lg:col-span-2">
              <Reveal delay={120} className="bg-white border border-black/10 rounded-2xl p-6 h-full">
                <p className="text-xs font-medium tracking-widest text-black/40 uppercase mb-4">
                  Relevant coursework
                </p>
                <div className="flex flex-col gap-2.5">
                  {COURSEWORK.map((c) => (
                    <div
                      key={c}
                      className="flex items-start gap-2.5 text-sm text-black/70 border border-black/8 rounded-xl px-4 py-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{c}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT / DARK CTA ---------------- */}
      <section id="contact" className="px-6 sm:px-8 py-24">
        <Reveal className="max-w-5xl mx-auto">
          <div className="bg-black text-white rounded-3xl px-8 py-16 sm:py-20 text-center relative overflow-hidden">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
              Let's build something together.
            </h2>
            <p className="text-white/55 max-w-lg mx-auto mt-5 leading-relaxed">
              Always interested in internships, junior roles, and projects
              where I can keep learning while shipping real value.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
              <Magnetic
                as="a"
                href="mailto:kmrashh07@gmail.com"
                className="btn-primary inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm font-medium"
              >
                <Mail size={16} /> Email me
              </Magnetic>
              <Magnetic
                as="a"
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="btn-outline inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 rounded-full text-sm font-medium hover:bg-white hover:text-black"
              >
                <Github size={16} /> GitHub
              </Magnetic>
              <Magnetic
                as="a"
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noreferrer"
                className="btn-outline inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 rounded-full text-sm font-medium hover:bg-white hover:text-black"
              >
                <Linkedin size={16} /> LinkedIn
              </Magnetic>
            </div>

            <button
              onClick={handleCopyEmail}
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors"
            >
              {state.copied ? (
                <>
                  <Check size={12} /> Copied to clipboard
                </>
              ) : (
                <>
                  <Copy size={12} /> kmrashh07@gmail.com
                </>
              )}
            </button>
          </div>
        </Reveal>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="px-6 sm:px-8 py-12 border-t border-black/10">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-12 gap-10">
          <div className="sm:col-span-4">
            <div className="font-bold text-lg tracking-tight mb-3">Rashmika</div>
            <p className="text-sm text-black/50 leading-relaxed max-w-xs">
              Full-stack developer and software engineering student building
              clean, scalable web applications.
            </p>
            <span className="inline-block mt-4 text-[11px] font-mono border border-black/10 rounded-full px-2.5 py-1 text-black/40">
              v2026.2 · portfolio
            </span>
          </div>

          <div className="sm:col-span-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-3">Explore</p>
            <div className="flex flex-col gap-2">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-sm text-black/60 hover:text-black transition-colors">
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-3">Connect</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:kmrashh07@gmail.com" className="text-sm text-black/60 hover:text-black transition-colors">Email</a>
              <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-sm text-black/60 hover:text-black transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="text-sm text-black/60 hover:text-black transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-black/40">© 2026 Rashmika. Built with React &amp; Tailwind.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:kmrashh07@gmail.com" className="text-black/40 hover:text-black transition-colors"><Mail size={16} /></a>
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-black/40 hover:text-black transition-colors"><Github size={16} /></a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="text-black/40 hover:text-black transition-colors"><Linkedin size={16} /></a>

            {/* ---- easter egg: doodle drawn by my girlfriend ---- */}
            <div className="group relative ml-1">
              <span className="block h-2 w-2 rounded-full bg-black/15 group-hover:bg-black/40 transition-colors cursor-pointer" />
              <div
                className="pointer-events-none absolute bottom-6 right-0 flex flex-col items-center opacity-0 scale-90 origin-bottom-right
                           group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out"
              >
                <div className="bg-white border border-black/10 shadow-lg rounded-sm p-2 -rotate-3">
                  <img
                    src="/drawingher.png"
                    alt="A little doodle"
                    className="w-24 h-24 object-contain"
                    draggable={false}
                  />
                </div>
                <p className="mt-1 text-[10px] text-black/40 whitespace-nowrap">
                  drawn by my girlfriend &hearts;
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Magnetic
        onClick={() => scrollTo("top")}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-opacity duration-300 ${
          progress > 15 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} />
      </Magnetic>
    </div>
    </UIContext.Provider>
  );
}