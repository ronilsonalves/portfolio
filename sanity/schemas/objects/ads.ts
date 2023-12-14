import { defineField, defineType } from "sanity";

export default defineType({
    name: 'ads',
    title: 'Ads',
    type: 'object',
    description: 'Allows you to add Google Adsense ads to your content',
    fields: [
        defineField({
            type: 'string',
            name: 'adsenseSlot',
            title: 'Adsense Slot',
            validation(rule) {
                return rule.required().error('You have to fill out the adsense slot ID');
            }
        }),
        defineField({
            type: 'string',
            name: 'adsenseLayout',
            title: 'Ad Layout',
            options: {
                list: [
                    { title: 'In Article', value: 'in-article' },
                    { title: 'In Feed', value: 'in-feed' },
                    { title: 'Auto', value: 'auto' },
                ],
            },
        }),
        defineField({
            type: 'string',
            name: 'adsenseFormat',
            title: 'Ad Format',
            options: {
                list: [
                    { title: 'Responsive', value: 'responsive' },
                    { title: 'Fixed', value: 'fixed' },
                ],
            },
        }),
        defineField({
            type: 'string',
            name: 'adsenseClient',
            title: 'Adsense Client',
            validation(rule) {
                return rule.required().error('You have to fill out the adsense client ID');
            },
        }),
    ],
})