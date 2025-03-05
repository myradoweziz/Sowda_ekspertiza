<template>
  <div class="company-b">
    <div class="company-b__container __container">
      <div class="company-b__top" v-for="item in companies" :key="item.uuid">
        <div class="company-b__title" v-html="normalizeTextByLang(item, 'title')[$i18n.locale]" />
        <div class="company-b__content">
          <div class="company-b__img-box">
            <div class="company-b__img">
              <img v-if="item.img_path" :src="`${imgURL}/uploads/enterprises/${item.img_path}`"  alt="" />
            </div>
          </div>
          <div class="company-b__text" v-html="normalizeTextByLang(item, 'text')[$i18n.locale]" />
        </div>
      </div>
        <div class="company-b__table">
          <div class="company-b__table-box">
            <div class="company-b__table-title">{{ $t('schedule') }}</div>
            <div class="company-b__table-table">
              <the-table :items="commutes" />
            </div>
          </div>
        </div>
        <div class="company-b__services">
          <!-- <div class="company-b__services-box">
            <div class="company-b__services-img-box">
              <div class="company-b__services-img">
                <img src="@/assets/img/bus.png" alt="" />
              </div>
            </div>
            <div class="company-b__services-content">
              <div class="company-b__services-title">{{ $t('label') }}</div>
              <div class="company-b__services-text">
                {{ $t('bDesc') }}
              </div>
            </div>
          </div> -->
          <div class="company-b__services-title">{{ $t('label') }}</div>
          <div class="company-b__services-content">
            <div class="company-b__services-img-box">
              <div class="company-b__services-img">
                <img src="@/assets/img/bus.png" alt="" />
              </div>
            </div>
            <div class="company-b__services-text">{{ $t('bDesc') }}</div>
          </div>
        </div>
        <div class="company-b__contact">
          <div class="company-b__contact-box">
            <div class="company-b__contact-map-box">
              <div v-for="contact in contacts" :key="contact.uuid" class="company-b__contact-left">
                <div class="company-b__contact-leftItem">
                  <div class="company-b__contact-leftTitle">{{ $t('fax') }}</div>
                  <div class="company-b__contact-leftText">{{ contact.phone }}</div>
                </div>
                <div class="company-b__contact-leftItem">
                  <div class="company-b__contact-leftTitle">{{ $t('email') }}</div>
                  <div class="company-b__contact-leftText">{{ contact.email }}</div>
                </div>
                <div class="company-b__contact-leftItem">
                  <div class="company-b__contact-leftTitle">{{ $t('address') }}</div>
                  <div
                    class="company-b__contact-leftText"
                    v-html="normalizeTextByLang(contact, 'address')[$i18n.locale]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import TheTable from '@/components/ui/TheTable.vue'
  import Textfield from '@/components/base/Textfield.vue'
  import TheTextarea from '@/components/base/TheTextarea.vue'
  import Button from '@/components/base/Button.vue'

  import { getCommutes, getCities, getCompanies, getContacts, sendMail } from '@/api/user.api'
  import { mapGetters } from 'vuex'

  export default {
    components: { TheTable, Button, Textfield, TheTextarea },
    computed: { ...mapGetters(['imgURL']) },
    data() {
      return {
        commutes: [],
        cities: [],
        companies: [],
        contacts: [],
        limit: 5,
        page: 0,
        form: {
          name: '',
          email: '',
          message: '',
          phone: '+993 '
        }
      }
    },
    async mounted() {
      await this.fetchCity()
    },
    methods: {
      async sendMessage() {
        try {
          if (this.form.name && this.form.phone && this.form.email && this.form.message) {
            const { data, status } =
              (
                await sendMail({
                  data: {
                    name: this.form.name,
                    phone: this.form.phone,
                    email: this.form.email,
                    message: this.form.message,
                    cities_id: this.cities[1].uuid
                  }
                })
              ).data || []
            this.form.name = this.form.phone = this.form.email = this.form.message = ''
            if (status === 200) {
              alert('Habar bardy!')
            }
          }
        } catch (error) {
          console.error(error)
        }
      },
      async fetchCity() {
        try {
          const { data, status } = await getCities()
          if (status) this.cities = data.data
          await this.fetchCommutes(this.cities[1].uuid)
          await this.fetchCompanies(this.cities[1].uuid)
          await this.fetchContact(this.cities[1].uuid)
        } catch (error) {
          console.error(error)
        }
      },
      async fetchCommutes(id) {
        try {
          const { data, status } = await getCommutes({ data: { uuid: id, l: this.limit, p: this.page } })
          if (status) this.commutes = data.data
        } catch (error) {
          console.error(error)
        }
      },
      async fetchContact(id) {
        try {
          const { data, status } = await getContacts({ data: { uuid: id } })
          if (status) this.contacts = data.data
        } catch (error) {
          console.error(error)
        }
      },
      async fetchCompanies(id) {
        try {
          const { data, status } = await getCompanies({ data: { uuid: id } })
          if (status) {
            this.companies = data.data
          }
        } catch (error) {
          console.error(error)
        }
      },
      normalizeTextByLang(dontNormalItem, prefix = 'title') {
        return {
          tm: dontNormalItem[`${prefix}_tm`],
          ru: dontNormalItem[`${prefix}_ru`],
          en: dontNormalItem[`${prefix}_en`]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .company-b {
    padding: 60px 0px;
    @media (max-width: 768px) {
      padding: 40px 0px;
    }
    @media (max-width: 425px) {
      padding: 10px 0px;
    }
    // .company-b__container

    &__container {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    // .company-b__box

    &__box {
    }

    // .company-b__top

    &__top {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__content {
      width: 100%;
      height: max-content;
    }


    &__img-box {
      float: left;
      margin-right: 20px;
      width: 50%;
      @media (max-width: 768px) {
        width: 100%;
        margin-right: 0px;
        margin-bottom: 20px;
      }
    }


    &__img {
      position: relative;
      padding-top: 58.725341426%;
      border-radius: 5px;
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    &__title {
      font-size: 30px;
      font-weight: 700;
      line-height: 36px;
      text-align: justified;
      color: var(--black);
      @media (max-width: 425px) {
        font-size: 15px;
        font-weight: 600;
        line-height: 18px;
        text-align: left;
      }
    }


    &__text {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: justify;
      color: #333333;
      width: 100%;
      height: max-content;
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 425px) {
        font-size: 9.7px;
        font-weight: 400;
        line-height: 11.64px;
        text-align: justify;
      }
    }

    // .company-b__table

    &__table {
    }

    // .company-b__table-box

    &__table-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 30px;
      @media (max-width: 425px) {
        gap: 20px;
      }
    }

    // .company-b__table-title

    &__table-title {
      font-size: 30px;
      font-weight: 700;
      line-height: 36px;
      text-align: justify;
      color: #111111;
      @media (max-width: 425px) {
        font-size: 15px;
        font-weight: 600;
        line-height: 18px;
        text-align: justify;
      }
    }

    // .company-b__table-table

    &__table-table {
      width: 100%;
      height: 100%;
      overflow: auto;
    }

    // .company-b__service

    &__services {
      display: flex;
      flex-direction: column;
      gap: 20px;

      &-content {
        width: 100%;
        height: max-content;
      }


      &-img-box {
        float: left;
        margin-right: 20px;
        width: 50%;
        @media (max-width: 768px) {
          width: 100%;
          margin-right: 0px;
          margin-bottom: 20px;
        }
      }


      &-img {
        position: relative;
        padding-top: 58.725341426%;
        border-radius: 5px;
        img {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }

      &-title {
        font-family: Inter;
        font-size: 30px;
        font-weight: 700;
        line-height: 36px;
        text-align: justify;
        color: var(--black);
        @media (max-width: 425px) {
          font-size: 15px;
          font-weight: 600;
          line-height: 18px;
          text-align: left;
        }
      }


      &-text {
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        text-align: justify;
        color: #333333;
        width: 100%;
        height: max-content;
        @media (max-width: 768px) {
          width: 100%;
        }
        @media (max-width: 425px) {
          font-size: 9.7px;
          font-weight: 400;
          line-height: 11.64px;
          text-align: justify;
        }
      }
    }

    // .company-b__contact

    &__contact {
      width: 100%;
    }


    // .company-b__contact-left

    &__contact-left {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 50px;
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
      }
    }

    // .company-b__contact-leftItem

    &__contact-leftItem {
      width: max-content;
      display: flex;
      flex-direction: column;
      gap: 30px;
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
      }
    }

    // .company-b__contact-leftTitle

    &__contact-leftTitle {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: justify;
      @media (max-width: 768px) {
        font-size: 16px;
      }
      @media (max-width: 425px) {
        font-size: 14px;
      }
      @media (max-width: 375px) {
        font-size: 12px;
      }
    }

    // .company-b__contact-leftText

    &__contact-leftText {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: justify;
      @media (max-width: 768px) {
        font-size: 16px;
      }
      @media (max-width: 425px) {
        font-size: 14px;
      }
      @media (max-width: 375px) {
        font-size: 12px;
      }
    }
  }
</style>
