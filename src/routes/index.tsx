import { component$ , useVisibleTask$ ,useSignal,useTask$ } from "@builder.io/qwik";
import { type DocumentHead , Form } from "@builder.io/qwik-city";
import openPhotoSrc from '../assets/openPhoto.jpg';
import zipCodeJson from '../assets/taiwan_districts.json';


export const ImgOpenphoto = component$(() => {  
  return (
    <div class={'p-4 bg-red-100 flex items-center justify-center'}>
      <img class={'w-full h-full rounded'} src={openPhotoSrc}
        width={1920} height={1080}
      />
    </div>
  )
});


export default component$(() => {
  // 表單資料內容
  const formData = useSignal({
    name : { check : false , value : '' , title : '姓名'},
    willingness : { check : false , value : '' , title : '出席意願'},
    phone : { check : false , value : '' , title : '電話'},
    zipcode : { check : false , value : '' , title : '地址'},
    address : { check : false , value : '' , title : '地址'},
    vegetarianNum : { check : false , value : '' , title : '素食者人數'},
    partnerNum : { check : false , value : '' , title : '同行者人數'},
    childSeatNum : { check : false , value : '' , title : '兒童座椅數量'},
  },)


  // 縣市郵遞區號
  const zipJson = useSignal(zipCodeJson);
  const city = useSignal([] as any);
  const district = useSignal([] as any);
  const onSelCity = useSignal("");
  // 處理縣市郵遞區號
  useTask$(()=>{
    const handleZipCode = () => {
      city.value = zipJson.value.map((item) => {
        return item.name;
      })
    }
    handleZipCode()
  })
  // loading 效果
  const isLoading = useSignal(true);
  const isBgColor = useSignal(true);
  useVisibleTask$(({cleanup}) => {
    const script = document.createElement('script');
    script.type = "text/javascript"
    script.innerText =
      `
      new ScrollyVideo({
        scrollyVideoContainer: "scrolly-video",
        src: "https://elasticbeanstalk-ap-northeast-3-320080014524.s3.ap-northeast-3.amazonaws.com/videos/hotairballoon.mov",
      });
    `
    document.head.appendChild(script);
    const timeoutFirst = setTimeout(() => (isBgColor.value = false), 2000);
    const timeoutSecond = setTimeout(() => (isLoading.value = false), 2500);
    cleanup(() => clearTimeout(timeoutFirst));
    cleanup(() => clearTimeout(timeoutSecond));
  })
 
  // Modal content
  const message = useSignal('');
  const modalCtl = useSignal(false)


  return (
    <>
      <div class={'h-[100vh] relative flex items-center justify-center px-2'}>
        <div>
          <ImgOpenphoto></ImgOpenphoto>
          <p class={'text-red-400 font-medium text-2xl mt-4'}>
            哈囉！
          </p>
          <p class={'text-red-400 font-medium text-2xl mb-6'}>
            我們即將要舉辦我們的婚禮了！
          </p>
          <p class={'text-gray-600 font-medium text-lg'}>
            在這個對我們來說非常重要的日子，
          </p>
          <p class={'text-gray-600 font-medium text-lg'}>
            衷心希望能有您的參與，
          </p>
          <p class={'text-gray-600 font-medium text-lg'}>
            讓這個充滿意義的日子更為圓滿！
          </p>
          <p class={'text-gray-600 font-medium text-lg'}>
            請先幫我們填寫下方的資訊，讓我們可以初步的安排當天的座位！
          </p>
          <p class={'text-gray-600 font-medium mt-6 text-end'}>
            Roy & Buccula 浩銓 ＆ 韋潔 敬上
          </p>
        </div>
      </div>
      {
        isLoading.value ?
        <div id="loading"
          class={['fixed z-50 top-0 left-0 h-full flex justify-center items-center bg-gray-100 w-full transition-all ease-linear',isBgColor.value ? '' : 'opacity-0']}
        >
          <div class={'text-center'}>
            <svg class="animate-spin h-16 w-16 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </div>
        </div> : ''
      }
      <div class={'h-[400vh] relative'}>
        <div class={"bg-white opacity-90 text-gray-600 absolute top-[5%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg"}>
          <p>日期 Date：2024/03/10(週日Sunday)</p>
          <p>時間 Time：11:50 婚宴入席 12:00 婚宴開始</p>
          <p>
            地點 Location：新北市新莊區中央路469號
            <span class={'block ml-[8rem]'}>新莊典華婚宴會館（法蘿廳）</span>
          </p>
        </div>
        <div class={"bg-white text-gray-600 absolute top-[11%] xxs:top-[10%] xs:top-[9%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg"}>
          <img class={'w-full rounded'} src={'../assets/2021091303064111.jpg'}
            width={1920} height={1080}
          />
        </div>
        <div class={"bg-white opacity-90 text-gray-600 absolute top-[30%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg"}>
          <div class={"container center"}>
            <Form>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您的姓名？</label>
                <input type="text" name="text" required placeholder="請輸入您的姓名"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    formData.value.name.value = (event.target as HTMLInputElement).value
                    if((event.target as HTMLInputElement).value){
                      formData.value.name.check = false
                    }
                  }}
                />  
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問當天是否出席？</label>
                <select required
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onChange$={(event)=>{
                    formData.value.willingness.value = (event.target as HTMLSelectElement).value
                  }}
                >
                  <option value="" selected disabled>您的意願？</option>
                  <option value="1">Yes, 你結婚當然要到場啊！</option>
                  <option value="2">Sorry, 我很想參加，但是當天無法出席</option>
                  <option value="3">Not sure yet , 日期近一點才能確認</option>
                </select>
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您的聯絡電話？</label>
                <input type="tel" name="phone" required placeholder="請輸入您的聯絡電話"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    formData.value.phone.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'block mb-1'}>請問您的住址？</label>
                <select required
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 p-1 w-1/2"
                  onChange$={(event)=>{
                    onSelCity.value = (event.target as HTMLSelectElement).value,
                    zipJson.value.forEach((item) => {
                      if(item.name === onSelCity.value){
                        district.value = item.districts
                      }
                    })
                  }}
                >
                  <option value={''} selected disabled>請選擇您居住的縣市</option>
                  {city.value.map((item:any) => {
                    return <option value={item} key={item}>{item}</option>
                  })}
                </select>
                <select required
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 p-1 w-1/2"
                  onChange$={(event)=>{
                    formData.value.zipcode.value = (event.target as HTMLSelectElement).value
                  }}
                >
                  <option value={''} selected>請選擇您居住的區域</option>
                  {district.value.length > 1 ? district.value.map((item:any) => {
                    return <option value={item.zip} key={item.zip}>{item.name}</option>
                  }) : ''
                  }
                </select>
                <input type="text" name="text" required placeholder="請輸入您可以收到喜帖的地址"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    formData.value.address.value = (event.target as HTMLInputElement).value
                  }}
                />
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您的共幾個人出席？</label>
                <input type="number" name="text" required placeholder="人數請包含自己唷，方便我們分配桌數"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    formData.value.partnerNum.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您素食需求人數？</label>
                <input type="number" name="text" required placeholder="還請一併考量同行親友"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    formData.value.vegetarianNum.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您需要幾張兒童座椅？</label>
                <input type="number" name="text" required placeholder="如不需要，請選擇 0"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    formData.value.childSeatNum.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'flex justify-center items-center mt-8 text-2xl'}>
                <span>
                  請繼續往下滑唷！
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" ><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" fill="#4B5563" /></svg>
              </div>
            </Form>
          </div>
        </div>
        <div class={"bg-white opacity-90 text-gray-600 absolute top-[55%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg flex justify-center"}>
          <p>超級感謝！您的填寫，剩下最後一步了！</p>
        </div>
        <div class={"bg-white opacity-90 text-gray-600 absolute top-[65%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg text-center"}>
          <p>最後請您按下下方的送出資料！</p>
          <p>我們期待您的到來！</p>
        </div>
        <div class={"bg-white opacity-90 text-white absolute top-[75%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg flex justify-center"}>
          <button
            class={'rounded bg-red-400 border-b-2 border-gray-700 active:bg-red-300 p-2'}
            onClick$={()=>{
              // 創建一個新的 FormData 對象
              const postForm = new FormData();
              // 將表單資料添加到 FormData 對象中
              postForm.append('name', formData.value.name.value);
              postForm.append('willingness', formData.value.willingness.value);
              postForm.append('phone', formData.value.phone.value);
              postForm.append('zipcode', formData.value.zipcode.value);
              postForm.append('address', formData.value.address.value);
              postForm.append('vegetarianNum', formData.value.vegetarianNum.value);
              postForm.append('partnerNum', formData.value.partnerNum.value);
              postForm.append('childSeatNum', formData.value.childSeatNum.value);


              const array = Object.values(formData.value)
              for(let i=0 ; i<array.length ; i++ ){
                if(array[i].value == ''){
                  array[i].check = true
                }else{
                  array[i].check = false
                }
                if(array[i].check){
                  message.value = `請填寫${array[i].title}欄位,謝謝`
                  modalCtl.value = true
                  return
                }
              }
              const apiUrl = 'https://script.google.com/macros/s/AKfycbwqtqwnwLIqvSpS22e8eC5XsiyEeHumgC75VbiOJm715U0wtGHRdMZ05KWshMcKzSDCZA/exec';
              const fetchOptions: RequestInit = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' // 設定傳送資料的類型為 JSON
                },
                body:postForm
              };
              fetch(apiUrl,fetchOptions)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
              })
              .then(data => {
                console.log('API 傳回的資料:', data);
              })
              .catch(error => {
                console.error('發生錯誤:', error);
              });
            }}
          >
            送出資料!
          </button>
        </div>
        {modalCtl.value ?
          <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"   id="modal-id">
            <div class="absolute bg-black opacity-70 inset-0 z-0"></div>
            <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
              <div class="">          
                <div class="p-3  mt-2 text-center space-x-4 md:block">
                  <p class="text-gray-600 text-lg font-semibold mb-2">{message.value}</p>
                  <button onClick$={()=>{
                    message.value = ''
                    modalCtl.value = false
                  }}
                    class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                    OK!
                  </button>
                </div>
              </div>
            </div>
          </div> : ''
        }
        <div id="scrolly-video"></div>
      </div>
    </>
  );
});


export const head: DocumentHead = {
  title: "ROY & BUCCULA",
  meta: [
    {
      name: "description",
      content: "ROY & BUCCULA WEDDING",
    },
  ],
};


