<template>
    <div 
        :class="[
            'skeleton',
            widthClass,
            heightClass,
            shapeClass,
            additionalClasses
        ]"
    ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    width?: string | number
    height?: string | number
    circle?: boolean
    rounded?: boolean
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    width: 'full',
    height: '4',
    circle: false,
    rounded: false,
    class: ''
})

const widthClass = computed(() => {
    if (typeof props.width === 'number') {
        return `w-${props.width}`
    }
    return props.width === 'full' ? 'w-full' : `w-${props.width}`
})

const heightClass = computed(() => {
    if (typeof props.height === 'number') {
        return `h-${props.height}`
    }
    return `h-${props.height}`
})

const shapeClass = computed(() => {
    if (props.circle) return 'rounded-full'
    if (props.rounded) return 'rounded'
    return ''
})

const additionalClasses = computed(() => props.class)
</script>
