import { $, component$ , useVisibleTask$ ,useSignal,useTask$ } from "@builder.io/qwik";
import { type DocumentHead , Form } from "@builder.io/qwik-city";
import openPhotoSrc from '/openPhoto.jpg';
import locationInfo from '/2021091303064111.jpg';
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
  const name = useSignal("");
  const willingness = useSignal("");
  const phone = useSignal("");
  const zipcode = useSignal("");
  const address = useSignal("");
  const vegetarianNum = useSignal("");
  const partnerNum = useSignal("");
  const childSeatNum = useSignal("");

  // 縣市郵遞區號
  const zipJson = useSignal(zipCodeJson);
  const city = useSignal([]);
  const district = useSignal([]);
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
  // 控制表單送出
  const handleSubmitForm = $((values, event) => {
    // Runs on client
    console.log(values);
  });
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
        src: "/hotairballoon.mov",
      });
    `
    document.head.appendChild(script);
    const timeoutFirst = setTimeout(() => (isBgColor.value = false), 2000);
    const timeoutSecond = setTimeout(() => (isLoading.value = false), 2500);
    cleanup(() => clearTimeout(timeoutFirst));
    cleanup(() => clearTimeout(timeoutSecond));
  })

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
          <img class={'w-full rounded'} src={locationInfo} 
            width={1920} height={1080}
          />
        </div>
        <div class={"bg-white opacity-90 text-gray-600 absolute top-[30%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg"}>
          <div class={"container center"}>
            <Form onSubmit$={handleSubmitForm}>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您的姓名？</label>
                <input type="text" name="text" required placeholder="請輸入您的姓名"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    name.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問當天是否出席？</label>
                <select required
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onChange$={(event)=>{
                    willingness.value = (event.target as HTMLSelectElement).value
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
                    phone.value = (event.target as HTMLInputElement).value
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
                  {city.value.map((item) => {
                    return <option value={item} key={item}>{item}</option>
                  })}
                </select>
                <select required
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 p-1 w-1/2"
                  onChange$={(event)=>{
                    zipcode.value = (event.target as HTMLSelectElement).value
                  }}
                >
                  {district.value.length > 1 ? district.value.map((item) => {
                    return <option value={item.zip} key={item.zip}>{item.name}</option>
                  }) : 
                    <option value={''}>請選擇您居住的區域</option>
                  }
                </select>
                <input type="text" name="text" required placeholder="請輸入您可以收到喜帖的地址"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    address.value = (event.target as HTMLInputElement).value
                  }}
                />
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您的共幾個人出席？</label>
                <input type="number" name="text" required placeholder="人數請包含自己唷，方便我們分配桌數"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    partnerNum.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您素食需求人數？</label>
                <input type="number" name="text" required placeholder="還請一併考量同行親友"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    vegetarianNum.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'mt-2 mb-3'}>
                <label class={'mb-1'}>請問您需要幾張兒童座椅？</label>
                <input type="number" name="text" required placeholder="如不需要，請選擇 0"
                  class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                  onInput$={(event)=>{
                    childSeatNum.value = (event.target as HTMLInputElement).value
                  }}
                />  
              </div>
              <div class={'flex justify-center items-center mt-8 text-2xl'}>
                <span>
                  請繼續往下滑唷！
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" ><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" fill="#4B5563" /></svg>
              </div>
              <button id="submitBtn" type="submit"></button>
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
              const submit = document.querySelector<HTMLButtonElement>('#submitBtn')
              if(submit != null){
                submit.click()
              }
            }}
          >
            送出資料!
          </button>
        </div>
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
