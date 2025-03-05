<template>
  <div class="order-contact">
    <div class="order-contact__container __container">
      <div class="order-contact__head">
        <div class="order-contact__title">{{ $t('order') }}</div>
      </div>
      <div class="order-contact__body">
        <form class="order-contact__form">
            <textfield
              @input="(text) => (form.contacts.companyName = text)"
              :value.sync="form.contacts.companyName"
              :title="$t('nameAgency')"
              type="text"
              :placeholder="$t('nameAgency')"
            />
            <textfield
              @input="(text) => (form.contacts.responsible = text)"
              :value.sync="form.contacts.responsible"
              :title="$t('defendantSurname')"
              type="text"
              important
              :placeholder="$t('defendantSurname')"
            />
            <textfield
              @input="(text) => (form.contacts.email = text)"
              :value.sync="form.contacts.email"
              title="E-mail"
              type="email"
              placeholder="E-mail"
            />
            <textfield
              @input="(text) => (form.contacts.phone = text)"
              :value.sync="form.contacts.phone"
              :title="$t('yourNumber')"
              type="tel"
              :placeholder="$t('yourNumber')"
            />
            <textfield
              @input="(text) => (form.contacts.from = text)"
              :value.sync="form.contacts.from"
              :title="$t('from')"
              type="text"
              :placeholder="$t('from')"
            />
            <textfield
              @input="(text) => (form.contacts.to = text)"
              :value.sync="form.contacts.to"
              :title="$t('where')"
              type="text"
              :placeholder="$t('where')"
            />
            <textfield
              @input="(text) => (form.contacts.ordersCount = text)"
              :value.sync="form.contacts.ordersCount"
              :title="$t('numberSeats')"
              type="number"
              :placeholder="$t('numberSeats')"
            />
            <textfield
              @input="(text) => (form.contacts.delay = text)"
              :value.sync="form.contacts.delay"
              :title="$t('orderDuration')"
              type="number"
              :placeholder="$t('orderDuration')"
            />
            <textfield
              @input="(text) => (form.contacts.date = text)"
              :value.sync="form.contacts.date"
              :title="$t('dateVehicle')"
              type="date"
              appendIcon="calendar_today"
              :placeholder="$t('dateVehicle')"
            />
            <textfield
              @input="(text) => (form.contacts.hours = text)"
              :value.sync="form.contacts.hours"
              :title="$t('timeVehicle')"
              type="text"
              placeholder="00:00"
            />
        </form>
        <div class="order-contact__textarea">
          <the-textarea
              @input="(text) => (form.contacts.note = text)"
              :value.sync="form.contacts.note"
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
        form: {
          contacts: {
            companyName: '',
            responsible: '',
            email: '',
            phone: '+993 ',
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
    async mounted() {
      this.itemUuid = await this.$cookie.get('budgetContactUuid')
      // await this.sendTable()
    },
    methods: {
      async sendTable() {
        try {
          if (
            this.form.contacts.companyName &&
            this.form.contacts.responsible &&
            this.form.contacts.email &&
            this.form.contacts.phone &&
            this.form.contacts.from &&
            this.form.contacts.to &&
            this.form.contacts.delay &&
            this.form.contacts.ordersCount &&
            this.form.contacts.date &&
            this.form.contacts.note &&
            this.form.contacts.hours
          ) {
            const { data, status } =
              (await sendBusMail({
                data: {
                  name_of_entity: this.form.contacts.companyName,
                  name: this.form.contacts.responsible,
                  email: this.form.contacts.email,
                  phone: this.form.contacts.phone,
                  go_from: this.form.contacts.from,
                  come_to: this.form.contacts.to,
                  quantity: Number(this.form.contacts.delay),
                  date: this.form.contacts.date,
                  duration: Number(this.form.contacts.ordersCount),
                  mark: this.form.contacts.note,
                  time: this.form.contacts.hours,
                  order_id: this.itemUuid
                }
              }).data) || []
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
            if (status === 200) {
              alert(this.t('ordersSend'))
              this.$router.push('/ordersEnd')
            }
          } else {
            alert(this.$t('orderReq'))
          }
        } catch (error) {
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
