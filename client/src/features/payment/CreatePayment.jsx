import React from 'react';
import Button from '../../ui/Button';

function CreatePayment() {
    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">Payment Information</h2>

            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    alert("Payment Successful");
                }
            }>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Card Number</label>
                    <input
                        className="input w-1/2"
                        type="text"
                        name="cardNumber"
                        placeholder="Enter your card number"
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Expiration Date</label>
                    <input
                        className="input w-1/2"
                        type="text"
                        name="expirationDate"
                        placeholder="MM/YY"
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">CVV</label>
                    <input
                        className="input w-1/4"
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        required
                    />
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="saveCard"
                        id="saveCard"
                    />
                    <label htmlFor="saveCard" className="font-medium">
                        Save card for future payments
                    </label>
                </div>

                <div className="flex justify-end">
                    <Button type="primary">Payment</Button>
                </div>

            </form>
        </div>
    );
}

export default CreatePayment;
