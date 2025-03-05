<template>
  <div class="order-contact">
    <div class="order-contact__container __container">
      <div class="order-contact__head">
        <div class="order-contact__title">{{ $t('order') }}</div>
      </div>
      <div class="order-contact__body">
        <form class="order-contact__form">
            <textfield
              :value.sync="form.contacts.companyName"
              @input="(text) => (form.contacts.companyName = text)"
              :error="!form.contacts.companyName && errorInput"
              :title="$t('nameAgency')"
              type="text"
              :placeholder="$t('nameAgency')"
            />
            <textfield
              :value.sync="form.contacts.responsible"
              @input="(text) => (form.contacts.responsible = text)"
              :error="!form.contacts.responsible && errorInput"
              :title="$t('defendantSurname')"
              type="text"
              important
              :placeholder="$t('defendantSurname')"
            />
            <textfield
              :value.sync="form.contacts.email"
              @input="(text) => (form.contacts.email = text)"
              :error="(!form.contacts.email && errorInput) || (emailValid && errorInput)"
              :title="$t('email')"
              type="email"
              placeholder="E-mail"
            />
            <textfield
              :value.sync="form.contacts.phone"
              @input="(text) => (form.contacts.phone = text)"
              :error="(!form.contacts.phone && errorInput) || (form.contacts.phone.length < 12 && errorInput)"
              :title="$t('yourNumber')"
              type="tel"
              :placeholder="$t('yourNumber')"
            />
            <textfield
              :value.sync="form.contacts.from"
              @input="(text) => (form.contacts.from = text)"
              :error="!form.contacts.from && errorInput"
              :title="$t('from')"
              type="text"
              :placeholder="$t('from')"
            />
            <textfield
              :value.sync="form.contacts.to"
              @input="(text) => (form.contacts.to = text)"
              :error="!form.contacts.to && errorInput"
              :title="$t('where')"
              type="text"
              :placeholder="$t('where')"
            />
            <textfield
            :value.sync="form.contacts.ordersCount"
            @input="(text) => (form.contacts.ordersCount = text)"
            :error="!form.contacts.ordersCount && errorInput"
            :title="$t('numberSeats')"
            type="number"
            :placeholder="$t('numberSeats')"
          />
            <textfield
              :value.sync="form.contacts.delay"
              @input="(text) => (form.contacts.delay = text)"
              :error="!form.contacts.delay && errorInput"
              :title="$t('orderDuration')"
              type="number"
              :placeholder="$t('orderDuration')"
            />
            <textfield
              :value.sync="form.contacts.date"
              @input="(text) => (form.contacts.date = text)"
              :error="!form.contacts.date && errorInput"
              :title="$t('dateVehicle')"
              type="date"
              appendIcon="calendar_today"
              :placeholder="$t('dateVehicle')"
            />
            <textfield
              :value.sync="form.contacts.hours"
              :error="!form.contacts.hours && errorInput"
              @input="(text) => (form.contacts.hours = text)"
              :title="$t('timeVehicle')"
              type="text"
              placeholder="00:00"
            />
        </form>
        <div class="order-contact__textarea">
          <the-textarea
          :value.sync="form.contacts.note"
          @input="(text) => (form.contacts.note = text)"
          :title="$t('note')"
        />
        </div>
        <div class="order-contact__btn">
          <div class="order-contact__button">
            <Button @onClick="sendTable" :text="$t('give')" appendIcon="send" primary />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Textfield from '@/components/base/Textfield.vue'
  import TheTextarea from '@/components/base/TheTextarea.vue'
  import Button from '@/components/base/Button.vue'

  import { sendBusMail } from '@/api/user.api'

  export default {
    layout: 'default',
    components: { Textfield, TheTextarea, Button },
    emits: ['sendDocument'],
    data() {
      return {
        errorInput: false,
        form: {
          contacts: {
            companyName: '',
            responsible: '',
            email: '',
            phone: '',
            from: '',
            to: '',
            delay: '',
            ordersCount: '',
            date: '',
            hours: '',
            note: ''
          },
          itemUuid: null
        }
      }
    },
    computed: {
      emailValid() {
      return !String(this.form.contacts.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    }
    },
    async mounted() {
      this.itemUuid = await this.$cookie.get('budgetItemsUuid')
    },
    methods: {
      async sendTable() {
        try {
          if (
            !this.form.contacts.companyName ||
            !this.form.contacts.responsible ||
            !this.form.contacts.email ||
            !this.form.contacts.phone ||
            !this.form.contacts.from ||
            !this.form.contacts.to ||
            !this.form.contacts.delay ||
            !this.form.contacts.ordersCount ||
            !this.form.contacts.date ||
            !this.form.contacts.hours || this.emailValid || this.form.contacts.phone.length < 12
          ) {


            this.errorInput = false
            setTimeout(() => {
              this.errorInput = true
            }, 0)

            return
          } else {
            const { data, status } =
              (await sendBusMail({
                data: {
                  name_of_entity: this.form.contacts.companyName,
                  name: this.form.contacts.responsible,
                  email: this.form.contacts.email,
                  phone: this.form.contacts.phone,
                  go_from: this.form.contacts.from,
                  come_to: this.form.contacts.to,
                  quantity: Number(this.form.contacts.ordersCount),
                  date: this.form.contacts.date,
                  duration: Number(this.form.contacts.delay),
                  mark: this.form.contacts.note,
                  time: this.form.contacts.hours,
                  order_id: this.itemUuid
                }
              }).data) || []
            if (status === 200) {
              this.form.contacts.companyName =
              this.form.contacts.responsible =
              this.form.contacts.email =
              this.form.contacts.phone =
              this.form.contacts.from =
              this.form.contacts.to =
              this.form.contacts.delay =
              this.form.contacts.ordersCount =
              this.form.contacts.date =
              this.form.contacts.note =
              this.form.contacts.hours =
                ''
              this.$router.push('/ordersEnd')
            }
          }
        } catch (error) {
          alert('Yalnyslyk yuze cykdy ya-da internet nasazlygy')
          console.error(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-contact {
    padding: 60px 0px;
    @media (max-width: 768px) {
      padding: 40px 0px;
    }
    @media (max-width: 425px) {
      padding: 10px 0px;
    }
    // .news-page__container

    &__container {
    }

    // .news-page__head

    &__head {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      @media (max-width: 768px) {
        margin-bottom: 20px;
      }
    }

    // .news-page__title

    &__title {
      font-size: 30px;
      font-weight: 700;
      line-height: 36px;
      text-align: justify;
      color: var(--black);
      @media (max-width: 425px) {
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
        text-align: left;
      }
    }


    &__body {
      width: 100%;
      height: 100%;
    }

    &__form {
      display: grid;
      column-gap: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(3, 1fr);
      @media (max-width: 900px) {
         grid-template-columns: repeat(2, 1fr)
      }
      @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
        row-gap: 10px;
      }
    }
    &__textarea {
      margin-top: 20px;
      @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
        margin-top: 10px;
      }
    }

    &__btn {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-top: 20px;
      @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
        margin-top: 10px;
      }
    }
    &__button {
      width: 120px;
      height: 44px;
      @media (max-width: 425px) {
        grid-template-columns: repeat(1, 1fr);
        width: 80px;
        height: 30px;
      }
    }
  }
</style>
