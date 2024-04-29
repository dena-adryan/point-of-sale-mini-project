// import React from 'react';

export default function Table() {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal Transaksi
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID Transaksi
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Harga
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Bayar
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">30</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        john@example.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">Rp. xx</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button>DETAIL TRANSAKSI</button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Jane Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">25</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        jane@example.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">Rp. xx</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button>DETAIL TRANSAKSI</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
