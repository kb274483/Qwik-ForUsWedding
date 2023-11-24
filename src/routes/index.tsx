import { component$ , useVisibleTask$ ,useSignal,useTask$, useStore } from "@builder.io/qwik";
import { type DocumentHead  } from "@builder.io/qwik-city";
import openPhotoSrc from '../assets/53346273673.jpg';
import ameiPhotoSrc from '../assets/amei.jpg';
import yahooBanPhotoSrc from '../assets/yahooBan.png'
import locationInfo from '../assets/2021091303064111.jpg';
import zipCodeJson from '../assets/taiwan_districts.json';
import styles from './index.module.css'

export const AmeiPhoto = component$(() => {
  return (
    <div class={'absolute top-[0%] xs:top-[2%] md:top-[0%] z-0 w-40'} 
      data-aos="fade-up"
      data-aos-delay="2500"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-once="false"
    >
      <img class={'w-full h-full rounded'} src={ameiPhotoSrc}
        width={1024} height={683}
      />
    </div>
  )
});
export const YahooBanPhoto = component$(() => {
  return (
    <div class={'absolute top-[30%] max-w-[250px] -translate-y-1/2 z-10'}>
      <img class={'w-full h-full rounded'} src={yahooBanPhotoSrc}
        width={1024} height={683}
      />
    </div>
  )
});

export const ImgOpenphoto = component$(() => {  
  return (
    <div class={'p-3 bg-red-100 relative z-10 mt-12 xxs:mt-6 xs:mt-4 md:mt-12'}
      data-aos="fade-up"
      data-aos-delay="2000"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-once="false"
    >
      <p class={'text-white font-medium text-2xl text-end'}>
        Wedding Invitation
      </p>
      <img class={'w-full h-full rounded'} src={openPhotoSrc}
        width={1024} height={683}
      />
    </div>
  )
});

declare let AOS: any;
export default component$(() => {
  // 表單資料內容
  const formData = useSignal({
    name : { check : false , value : '' , title : '姓名'},
    willingness : { check : false , value : '' , title : '出席意願'},
    dietary : { check : false , value : '葷食' , title : '是否素食'},
    phone : { check : false , value : '' , title : '電話'},
    zipcode : { check : false , value : '' , title : '地址'},
    city : { check : false , value : '' , title : '縣市區域'},
    address : { check : false , value : '' , title : '地址'},
    childSeatNum : { check : false , value : '' , title : '兒童座椅數量'},
    brideOrGroom : { check : false , value : '' , title : '新郎或是新娘的朋友'},
  },)
  const partner = useStore([
    {name:'',dietary:'葷食',id:1}
  ])

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
    AOS.init();
    const script = document.createElement('script');
    script.type = "text/javascript"
    script.innerText =
      `
      new ScrollyVideo({
        scrollyVideoContainer: "scrolly-video",
        src: "https://elasticbeanstalk-ap-northeast-3-320080014524.s3.ap-northeast-3.amazonaws.com/videos/temp_video_1700561295148.MP4",
      });
    `
    document.head.appendChild(script);
    const timeoutFirst = setTimeout(() => (isBgColor.value = false), 1800);
    const timeoutSecond = setTimeout(() => (isLoading.value = false), 2300);
    cleanup(() => clearTimeout(timeoutFirst));
    cleanup(() => clearTimeout(timeoutSecond));
  })
 
  // Modal content
  const message = useSignal('');
  const modalCtl = useSignal(false)
  // 在第一次送出資料後，鎖住送出按鈕，避免重複送出
  const isSubmitLock = useSignal(false)

  return (
    <>
      <div class={'h-[100vh] relative flex items-center justify-center p-2 max-w-[800px] mx-auto'}>
        <div>
          <AmeiPhoto></AmeiPhoto>
          <ImgOpenphoto></ImgOpenphoto>
          <p class={'text-red-400 font-medium text-2xl mt-2'}
            data-aos="fade-up"
            data-aos-delay="2500"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
          >
            哈囉！
          </p>
          <p class={'text-red-400 font-medium text-2xl mb-4'}
            data-aos="fade-up"
            data-aos-delay="2500"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
          >
            我們即將要舉辦我們的婚禮了！
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="2700"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
          >
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
            <p class={'text-gray-600 font-medium mt-4 text-end'}>
              Roy & Buccula 浩銓 ＆ 韋潔 敬上
            </p>
          </div>
        </div>
      </div>
      { // Loading 效果
        isLoading.value ?
        <div id="loading"
          class={[
            'fixed z-50 top-0 left-0 h-full flex justify-center items-center bg-gray-100 w-full transition-all ease-in-out duration-1000',
            isBgColor.value ? 'opacity-95' : 'opacity-0' 
          ]}
        >
          <div class={[styles.rectangleBounce]}>
            <div class={styles.rectOne}></div>
            <div class={styles.rectTwo}></div>
            <div class={styles.rectThree}></div>
            <div class={styles.rectFour}></div>
            <div class={styles.rectFive}></div>
          </div>
        </div> : ''
      }
      <div class={'h-[400vh] relative max-w-[800px] mx-auto'}>
        <div class={"bg-white opacity-80 text-gray-600 absolute top-[10%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg"}
          data-aos="zoom-in"
          data-aos-delay="20"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
        >
          <p>日期 Date：2024/03/10(週日Sunday)</p>
          <p>時間 Time：11:50 婚宴入席 12:00 婚宴開始</p>
          <p>
            地點 Location：新北市新莊區中央路469號
            <span class={'block ml-[8rem]'}>新莊典華婚宴會館（法蘿廳）</span>
          </p>
        </div>
        <div class={"bg-white text-gray-600 absolute top-[17%] xxs:top-[16%] xs:top-[15%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg"}
          data-aos="zoom-in"
          data-aos-delay="20"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
        >
          <img class={'w-full rounded'} src={locationInfo}
            width={1920} height={1080}
          />
        </div>
        <div class={"bg-white opacity-90 text-gray-600 absolute top-[50%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg"}
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div class={"container center"}>
            <div class={'mt-2 mb-3'}>
              <label class={'mb-1'}>請問您的姓名？</label>
              <input type="text" name="text" required placeholder="請輸入您的姓名"
                class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                onInput$={(event)=>{
                  formData.value.name.value = (event.target as HTMLInputElement).value
                  if((event.target as HTMLInputElement).value){
                    formData.value.name.check = false
                  }
                  if(isSubmitLock.value){
                    isSubmitLock.value = false
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
                <option value="" selected disabled>您的出席意願？</option>
                <option value="1">Yes, 你結婚當然要到場啊！</option>
                <option value="2">Sorry, 我很想參加，但是當天無法出席</option>
                <option value="3">Not sure yet , 日期近一點才能確認</option>
              </select>
            </div>
            <div class={'mt-2 mb-3'}>
              <label class={'mb-1'}>請問您是新郎還是新娘的朋友?</label>
              <select required
                class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                onChange$={(event)=>{
                  formData.value.brideOrGroom.value = (event.target as HTMLSelectElement).value
                }}
              >
                <option value="" selected disabled>請選擇</option>
                <option value="男方">新郎（Roy）</option>
                <option value="女方">新娘（Buccula）</option>
                <option value="共同">共同的朋友</option>
              </select>
            </div>
            <div class={'mt-2 mb-3'}>
              <label class={'mb-1'}>請問您是葷食還是素食呢?</label>
              <select required
                class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                onChange$={(event)=>{
                  formData.value.dietary.value = (event.target as HTMLSelectElement).value
                }}
              >
                <option value="葷食">葷食</option>
                <option value="素食">素食</option>
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
                  formData.value.city.value = onSelCity.value
                }}
              >
                <option value={''} selected>請選擇您居住的區域</option>
                {district.value.length > 1 ? district.value.map((item:any) => {
                  return <option value={[item.zip,item.name]} key={item.zip}>{item.name}</option>
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
              <label class={'mb-1'}>請問您的同行親友姓名以及是否素食?</label>
              <span class={'text-red-500 text-xs block'}>如沒有請留空白</span>
              {partner.map((item)=>
                <>
                  <div class={'flex items-center'} key={item.id}>
                    <input type="text" name="partnerName" required placeholder="請填寫親友姓名" 
                      class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                      onInput$={(event)=>{
                        item.name = (event.target as HTMLInputElement).value
                      }}
                    /> 
                    <select required
                      class="border-2 text-gray-700 rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-1"
                      onChange$={(event)=>{
                        item.dietary = (event.target as HTMLSelectElement).value
                      }}
                    >
                      <option value="葷食">葷食</option>
                      <option value="素食">素食</option>
                    </select> 
                  </div>
                </>
              ) }
              <div class={'flex justify-end'}>
                <button class={'rounded bg-gray-500 text-white border-b-2 border-orange-200 py-1 px-2'}
                  onClick$={()=>{
                    const createID = partner.length + 1
                    partner.push({
                      name : "" , dietary : "葷食" , id : createID
                    })
                  }}
                >
                  加位朋友
                </button>
              </div>
            </div>
            <div class={'mt-2 mb-3'}>
              <label class={'mb-1'}>請問您需要幾張兒童座椅？</label>
              <input type="number" name="text" required placeholder="請填寫數字即可，如不需要請填0"
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
          </div>
        </div>
        <div class={"bg-white opacity-70 absolute bottom-[5%] z-10 px-3 py-2 rounded-lg w-full font-medium text-lg text-center"}
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
        >
          <p class={'text-gray-600 '}>超級感謝！您的填寫，剩下最後一步了！</p>
          <p class={'text-gray-600 '}>最後請您按下下方的送出資料！</p>
          <p class={'text-gray-600 '}>我們期待您的到來！</p>
          <button
            class={'rounded bg-red-400 border-b-2 border-gray-700 active:bg-red-300 p-2 text-gray-100 mt-2'}
            onClick$={()=>{
              if(isSubmitLock.value){
                message.value = '您已經填過資料了喔，謝謝！'
                modalCtl.value = true
                return
              }
              isLoading.value = true
              isBgColor.value = true
              // 創建一個新的 Form
              const postForm = new FormData();
              // 將表單資料添加到 FormData 對象中
              postForm.append('name', formData.value.name.value);
              postForm.append('willingness', formData.value.willingness.value);
              postForm.append('phone', formData.value.phone.value);
              postForm.append('city', formData.value.city.value);
              postForm.append('zipcode', formData.value.zipcode.value);
              postForm.append('address', formData.value.address.value);
              postForm.append('dietary', formData.value.dietary.value);
              postForm.append('childSeatNum', formData.value.childSeatNum.value);
              postForm.append('brideOrGroom', formData.value.brideOrGroom.value);
              postForm.append('partner', JSON.stringify(partner));

              if((formData.value.name.value).trim() == ''){
                message.value = `請幫我填上姓名，謝謝`
                modalCtl.value = true
                isBgColor.value = false
                isLoading.value = false
                return
              }else if((formData.value.willingness.value).trim() == ''){
                message.value = `請幫我選擇出席意願，謝謝`
                modalCtl.value = true
                isBgColor.value = false
                isLoading.value = false
                return
              }
              const array = Object.values(formData.value)
              const apiUrl = 'https://script.google.com/macros/s/AKfycbwqtqwnwLIqvSpS22e8eC5XsiyEeHumgC75VbiOJm715U0wtGHRdMZ05KWshMcKzSDCZA/exec';
              const fetchOptions: RequestInit = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                mode: 'no-cors',
                body:postForm,
              };
              fetch(apiUrl,fetchOptions)
              .then(() => {
                isSubmitLock.value = true
                isBgColor.value = false
                message.value = '資料已成功送出，謝謝您的填寫！'
                for(let i=0 ; i<array.length ; i++ ){
                  array[i].value = ''
                }
                setTimeout(() => {
                  isLoading.value = false
                  modalCtl.value = true
                }, 500);
              })
              .catch(error => {
                console.error('發生錯誤:', error);
                message.value = '發生了一些錯誤，請稍後再試！或是聯絡我們，謝謝！'
                modalCtl.value = true
                isBgColor.value = false
                isLoading.value = false
              });
            }}
          >
            送出資料! 
          </button>
        </div>
        {/* modal 元件 */}
        {modalCtl.value ?
          <div class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div class="absolute bg-black opacity-70 inset-0 z-0"></div>
            <YahooBanPhoto></YahooBanPhoto>
            <div class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white z-30">
              <div class="">
                <div class="p-3  mt-2 text-center space-x-4 md:block ">
                  <p class="text-gray-600 text-lg font-semibold mb-2">{message.value}</p>
                  <button onClick$={()=>{
                    if(isSubmitLock.value && message.value === '您已經填過資料了喔，謝謝！'){
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                      });
                      setTimeout(() => {
                        location.reload();
                      }, 500);
                    }
                    modalCtl.value = false
                    message.value = ''
                  }}
                    class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                    OK!
                  </button>
                </div>
              </div>
            </div>
          </div> : ''
        }
        {/* scrolly-video container */}
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
      content: "ROY & BUCCULA WEDDING INVITATION",
    },
  ],
};





