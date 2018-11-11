import {observable, action, computed} from 'mobx';


class dogStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  foodList = 
  [
     {
       "id": "1",
       "name": "Amaranth greens",
       "category": "Vegetables",
       "description": [
         "Amaranthus",
         "collectively known as amaranth",
         "[1] is a cosmopolitan genus of annual or short-lived perennial plants. Some amaranth species are cultivated as leaf vegetables",
         "pseudocereals",
         "and ornamental plants. Most of the Amaranthus species are summer annual weeds and are commonly referred to as pigweed.[2] Catkin-like cymes of densely packed flowers grow in summer or autumn.[3] Approximately 60 species are recognized",
         "with inflorescences and foliage ranging from purple",
         "through red and green to gold. Members of this genus share many characteristics and uses with members of the closely related genus Celosia."
       ],
       "image": "https://firebasestorage.googleapis.com/v0/b/doggietime-prod.appspot.com/o/amaranth%20leaves.png?alt=media&token=566df0e3-4160-43b2-bbf3-8501108ab2e1",

     },
     {
       "id": "2",
       "name": "Avocado",
       "category": "Vegetables",
       "description": [
         "The avocado (Persea americana) is a tree",
         "long thought to have originated in South Central Mexico",
         "[2][3] classified as a member of the flowering plant family Lauraceae.[4] The fruit of the plant",
         "also called an avocado (or avocado pear or alligator pear)",
         "is botanically a large berry containing a single large seed known as a  pit  or a \"stone\".[5]"
       ],
       "image": "https://firebasestorage.googleapis.com/v0/b/doggietime-prod.appspot.com/o/avocado.png?alt=media&token=655045bf-3c1f-484d-9ebb-403165499a3c",
       "affiliateLink": ""
     },
     {
       "id": "3",
       "name": "Bell Peppers",
       "category": "Vegetables",
       "description": [
         "The misleading name  pepper  was given by Europeans when Christopher Columbus brought the plant back to Europe. At that time",
         "black pepper (peppercorns)",
         "from the unrelated plant Piper nigrum originating from India",
         "was a highly prized condiment; the name  pepper  was at that time applied in Europe to all known spices with a hot and pungent taste and was therefore naturally extended to the newly discovered genus Capsicum. The most commonly used alternative name of the plant family",
         "chile",
         "is of Mexican origin",
         "from the Nahuatl word chilli. Botanically speaking",
         "bell peppers are fruits; however",
         "they are considered vegetables in culinary contexts."
       ],
       "image": "https://firebasestorage.googleapis.com/v0/b/doggietime-prod.appspot.com/o/bell%20pepper.png?alt=media&token=383a2ee1-d9de-4626-8c1a-b4df7006be35",
       "affiliateLink": ""
     },
     {
       "id": "4",
       "name": "Chayote (Mexican Squash)",
       "category": "Vegetables",
       "description": [
         "Chayote[1] (Sechium edule) also known as mirliton squash is an edible plant belonging to the gourd family Cucurbitaceae. Chayote was one of the several foods introduced to the Old World during the Columbian Exchange. Also during this period",
         "the plant spread from Mexico to other parts of the Americas",
         "ultimately causing it to be integrated into the cuisine of many other Latin American nations."
       ],
       "image": "https://firebasestorage.googleapis.com/v0/b/doggietime-prod.appspot.com/o/chayote.png?alt=media&token=e88531c4-9fd4-4065-8f5f-922870f26e78",
       "affiliateLink": ""
     },
     {
       "id": "5",
       "name": "Cucumber",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "6",
       "name": "Dandelion greens",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "7",
       "name": "Garbanzo beans",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "8",
       "name": "Green banana",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "9",
       "name": "Izote",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "10",
       "name": "Kale",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "11",
       "name": [
         "Lettuce (all",
         "except Iceberg)"
       ],
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "12",
       "name": [
         "Mushrooms (all",
         "except Shiitake)"
       ],
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "13",
       "name": "Nopales – Mexican Cactus",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "14",
       "name": "Okra",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "15",
       "name": "Olives",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "16",
       "name": "Onions",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "17",
       "name": "Poke salad – greens",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "18",
       "name": "Purslane (Verdolaga)",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "19",
       "name": "Sea Vegetables (wakame/dulse/arame/hijiki/nori)",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "20",
       "name": "Squash",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "21",
       "name": "Tomato – cherry and plum only",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "22",
       "name": "Tomatillo",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "23",
       "name": "Turnip greens",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "24",
       "name": "Watercress",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     },
     {
       "id": "25",
       "name": "Zucchini",
       "category": "Vegetables",
       "description": "",
       "image": "",
       "affiliateLink": ""
     }
   ];


}

export default dogStore;
