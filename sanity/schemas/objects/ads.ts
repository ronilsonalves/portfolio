import { defineField, defineType } from "sanity";

const config = {
    defaultAdslot: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID!
}

export default defineType({
    name: 'ads',
    title: 'Google Adsense',
    type: 'object',
    description: 'Allows you to add Google Adsense ads to your content',
    fields: [
        defineField({
            type: 'string',
            name: 'adsenseSlot',
            title: 'Adsense Slot',
            description: 'The slot ID of the ad you want to display',
            initialValue: config.defaultAdslot,
            validation(rule) {
                return rule.required().error('You have to fill out the adsense slot ID');
            }
        }),
    ],
})