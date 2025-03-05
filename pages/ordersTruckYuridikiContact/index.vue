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
              :title="$t('nameAgency')"
              type="text"
              :placeholder="$t('nameAgency')"
              :error="!form.contacts.companyName && errorInput"
            />
            <textfield
              :value.sync="form.contacts.name"
              @input="(text) => (form.contacts.name = text)"
              :error="!form.contacts.name && errorInput"
              :title="$t('defendantSurname')"
              type="text"
              :placeholder="$t('defendantSurname')"
            />
            <textfield
              :value.sync="form.contacts.email"
              :error="(!form.contacts.email && errorInput) || (emailValid && errorInput)"
              @input="(text) => (form.contacts.email = text)"
              :title="$t('email')"
              type="email"
              placeholder="E-mail"
            />
            <textfield
              :value.sync="form.contacts.phone"
              :error="(!form.contacts.phone && errorInput) || (form.contacts.phone.length < 12 && errorInput)"
              @input="(text) => (form.contacts.phone = text)"
              :title="$t('yourNumber')"
              type="tel"
              :placeholder="$t('yourNumber')"
            />
            <textfield
              :value.sync="form.contacts.from"
              :error="!form.contacts.from && errorInput"
              @input="(text) => (form.contacts.from = text)"
              :title="$t('from')"
              type="text"
              :placeholder="$t('from')"
            />
            <textfield
              :value.sync="form.contacts.to"
              :error="!form.contacts.to && errorInput"
              @input="(text) => (form.contacts.to = text)"
              :title="$t('where')"
              type="text"
              :placeholder="$t('where')"
            />
            <textfield
              :value.sync="form.contacts.toLoad"
              :error="!form.contacts.toLoad && errorInput"
              @input="(text) => (form.contacts.toLoad = text)"
              :title="$t('typeLoad')"
              type="text"
              :placeholder="$t('typeLoad')"
            />
            <textfield
              :value.sync="form.contacts.cargoWeight"
              :error="!form.contacts.cargoWeight && errorInput"
              @input="(text) => (form.contacts.cargoWeight = text)"
              :title="$t('cargoWeight')"
              type="number"
              :placeholder="$t('cargoWeight')"
            />
            <textfield
            :value.sync="form.contacts.delay"
            :error="!form.contacts.delay && errorInput"
            @input="(text) => (form.contacts.delay = text)"
            :title="$t('orderDuration')"
            type="number"
            :placeholder="$t('orderDuration')"
          />
            <textfield
              :value.sync="form.contacts.date"
            :error="!form.contacts.date && errorInput"
              @input="(text) => (form.contacts.date = text)"
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

  import { sendTruckMail } from '@/api/user.api'

  export default {
    layout: 'default',
    components: { Textfield, TheTextarea, Button },
    async mounted() {
      this.contactsUuid = await this.$cookie.get('yuridikiUuid')
    },
    emits: ['sendDocument'],
    data() {
      return {
        contactsUuid: null,
        errorInput: false,
        form: {
          contacts: {
            companyName: '',
            name: '',
            email: '',
            phone: '',
            from: '',
            to: '',
            toLoad: '',
            cargoWeight: '',
            date: '',
            hours: '',
            delay: '',
            note: ''
          }
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
    methods: {
      async sendTable() {
        try {
          if (
            !this.form.contacts.companyName ||
            !this.form.contacts.name ||
            !this.form.contacts.email ||
            !this.form.contacts.phone ||
            !this.form.contacts.from ||
            !this.form.contacts.to ||
            !this.form.contacts.toLoad ||
            !this.form.contacts.cargoWeight ||
            !this.form.contacts.hours ||
            !this.form.contacts.delay ||
            !this.form.contacts.date || this.emailValid || this.form.contacts.phone.length < 12
         ) {


          this.errorInput = false
            setTimeout(() => {
              this.errorInput = true
            }, 0)

            return
          } else {
            const { data, status } =
              (await sendTruckMail({
                data: {
                  name_of_entity: this.form.contacts.companyName,
                  name: this.form.contacts.name,
                  email: this.form.contacts.email,
                  phone: this.form.contacts.phone,
                  go_from: this.form.contacts.from,
                  come_to: this.form.contacts.to,
                  type_of_cargo: this.form.contacts.toLoad,
                  quantity: Number(this.form.contacts.cargoWeight),
                  date: this.form.contacts.date,
                  duration: Number(this.form.contacts.delay),
                  mark: this.form.contacts.note,
                  order_id: this.contactsUuid,
                  time: this.form.contacts.hours
                }
              }).data) || []
            if (status === 200) {
              this.form.contacts.companyName =
              this.form.contacts.name =
              this.form.contacts.email =
              this.form.contacts.phone =
              this.form.contacts.from =
              this.form.contacts.to =
              this.form.contacts.toLoad =
              this.form.contacts.cargoWeight =
              this.form.contacts.hours =
              this.form.contacts.note =
              this.form.contacts.delay =
              this.form.contacts.date =
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
