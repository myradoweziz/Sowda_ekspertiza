<template>
  <table>
    <thead>
      <tr>
        <th>{{ $t('routes') }}</th>
        <th>{{ $t('point') }}</th>
        <th>{{ $t('departureTime') }}</th>
        <th>{{ $t('destination') }}</th>
        <th>{{ $t('arrivalTime') }}</th>
        <th>{{ $t('cycleCount') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item.uuid">
        <td>{{ item.route }}</td>
        <td>{{ item.start_point }}</td>
        <td>
          <div class="items">
            <div v-for="time in items[index].start_time" :key="time" class="items__item">{{ time }}</div>
          </div>
        </td>
        <td>{{ item.end_point }}</td>
        <td>
          <div class="items">
            <div v-for="time in items[index].end_time" :key="time" class="items__item">{{ time }}</div>
          </div>
        </td>
        <td>{{ item.count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  border-radius: 10px;
  thead {
    tr {
      th {
        background-color: #F1F1F1;
        padding: 20px 15px;
        font-size: 16px;
        font-weight: 600;
        line-height: 19.2px;
        text-align: left;
        color: var(--black);
        text-transform: none;
        width: 200px;
        position: relative;
        @media (max-width: 425px) {
          font-size: 10px;
        }
        &:first-child {
          border-top-left-radius: 10px;
          width: 100px;
        }
        &:last-child {
          border-top-right-radius: 10px;
          width: 120px;
          text-align: center;
        }
        &:not(:last-child){
          &::before {
            content: '';
            position: absolute;
            width: 3.01px;
            height: 20.33px;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #D9D9D9;
          }
        }
      }
    }
  }
  tbody {
    tr {
      &:nth-child(even) {
        td {
          background-color: #F7F7F7;
        }
      }
      &:last-child {
        td {
          &:first-child {
            border-bottom-left-radius: 10px;
          }
          &:last-child {
            border-bottom-right-radius: 10px;
          }
        }
      }
      td {
        height: 98px;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        text-align: left;
        color: var(--black);
        @media (max-width: 425px) {
          font-size: 10px;
          line-height: 11.64px;
          height: 50px;
        }
        &:nth-child(1) {
          text-align: center;
        }
        &:last-child {
          text-align: center;
        }
      }
    }
  }
}

.items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  // .items__item

  &__item {
  }
}
</style>
