import repository from './repository';

export default {
    namespaced: true,
    state: {
        detail: {},
        districts: [
            { code: 1, name: 'Quận Sơn Trà' },
            { code: 2, name: 'Quận Ngũ Hành Sơn' },
            { code: 3, name: 'Quận Hải Châu' },
            { code: 4, name: 'Quận Thanh Khê' },
            { code: 5, name: 'Quận Liên Chiểu' }
        ],
        wards: {}
    },
    mutations: {
        setWard(context, code) {
            const wards = [
                [
                    { code: 101, name: 'Phường Mân Thái' },
                    { code: 102, name: 'Phường An Hải Đông' }
                ],
                [
                    { code: 201, name: 'Phường Khuê Mỹ' },
                    { code: 202, name: 'Phường Hòa Quý' }
                ],
                [
                    { code: 301, name: 'Phường Thanh Bình' },
                    { code: 302, name: 'Phường Thanh Khê Tây' }
                ],
                [
                    { code: 401, name: 'Phường Xuân Hà' },
                    { code: 402, name: 'Phường Chính Gián' }
                ],
                [
                    { code: 501, name: 'Phường Hòa Hiệp Bắc' },
                    { code: 502, name: 'Phường Hòa Hiệp Nam' }
                ]
            ];
            context.state.wards = wards[code];
        }
    },
    actions: {
        onSave(context, payload) {
            try {
                repository.save(payload).then((res) => {
                    const { data } = res;
                    console.log(data);
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
