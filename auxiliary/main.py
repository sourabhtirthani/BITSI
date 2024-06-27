import configparser
import numpy as np
import secrets
from faker import Faker
from datetime import timedelta, datetime
import csv


def read_constants(config_file):
    config = configparser.ConfigParser()
    config.read(config_file)

    constants = {}
    if 'constants' in config:
        for key, value in config['constants'].items():
            constants[key] = value

    return constants


class SimNFT():
    def __init__(self, file):
        self.constants = read_constants(file)

    def gen_NFTs(self):
        time_period_days = int(self.constants['time_period_days'])
        nft_init_price_bitsi = int(self.constants['nft_init_price_bitsi'])
        number_nft_minted = int(self.constants['number_nft_minted'])

        days = np.linspace(0, time_period_days - 2, time_period_days, dtype=int)
        mint_days = np.sort(np.random.choice(days, size=number_nft_minted, replace=True))
        nfts = [np.random.uniform(nft_init_price_bitsi * 0.91, nft_init_price_bitsi * 1.3, time_period_days - mint_day)
                for mint_day in mint_days]
        for i, nft in enumerate(nfts):
            nft_updated = nft + nft_init_price_bitsi - np.mean(nft)
            nft_updated[0] = nft_init_price_bitsi
            nfts[i] = nft_updated
        self.nfts = [{'mint_day': day, 'price': price} for day, price in zip(mint_days, nfts)]

    def gen_loss(self):
        number_nft_claim_low_loss_nfts = int(self.constants['number_nft_claim_low_loss_nfts'])
        number_nft_claim_high_loss_nfts = int(self.constants['number_nft_claim_high_loss_nfts'])
        nft_init_price_bitsi = int(self.constants['nft_init_price_bitsi'])
        number_loss_total = number_nft_claim_high_loss_nfts + number_nft_claim_low_loss_nfts
        nfts = self.nfts
        idx = np.random.choice(range(len(nfts)), size=number_loss_total, replace=False)
        idx_low = idx[0:number_nft_claim_low_loss_nfts]
        idx_high = idx[number_nft_claim_low_loss_nfts:number_loss_total]
        [nfts[idx].update({'loss': 'low'}) for idx in idx_low]
        [nfts[idx].update({'loss': 'high'}) for idx in idx_high]
        idx_noloss = list(set(range(len(nfts))) - set(idx))
        [nfts[idx].update({'loss': 'no'}) for idx in idx_noloss]

        def gen_loss(nft):
            price = nft['price']
            if nft['loss'] == 'low':
                rand_day = np.random.randint(1, price.shape[0])
                price[rand_day] = np.random.uniform(nft_init_price_bitsi * 0.51, nft_init_price_bitsi * 0.9)
            elif nft['loss'] == 'high':
                rand_day = np.random.randint(1, price.shape[0])
                price[rand_day] = np.random.uniform(nft_init_price_bitsi * 0.1, nft_init_price_bitsi * 0.49)
            return nft

        nfts = [gen_loss(nft) for nft in nfts]
        self.nfts = nfts
        return nfts

    def gen_events(self):
        number_of_users = int(self.constants['number_of_users'])
        number_nft_compensation_claims = int(self.constants['number_nft_compensation_claims'])
        number_nft_coin_exchange = int(self.constants['number_nft_coin_exchange'])
        number_nft_claim_high_loss_ack = int(self.constants['number_nft_claim_high_loss_ack'])
        nfts = self.nfts
        marketplaces = [
            "Bitsi",
            "OpenSea",
            "Rarible",
            "SuperRare",
            "Foundation",
            "Nifty Gateway",
            "AtomicMarket",
            "BakerySwap",
            "Zora",
            "Mintable",
            "KnownOrigin",
            "Async Art",
            "MakersPlace",
            "NBA Top Shot",
            "Sorare",
            "Axie Infinity Marketplace",
            "Decentraland Marketplace",
            "CryptoPunks",
            "Crypto.com NFT",
            "Binance NFT",
            "Hic et Nunc"
        ]

        fake = Faker()
        usernames = [fake.user_name() for _ in range(number_of_users)]

        def generate_fake_metamask_id():
            try:
                return '0x' + ''.join(secrets.choice('0123456789abcdef') for _ in range(40))
            except Exception as e:
                print(f"An error occurred: {e}")
                return None

        def generate_list_of_metamask_ids(n):
            return [generate_fake_metamask_id() for _ in range(n)]

        fake_metamask_ids = generate_list_of_metamask_ids(number_of_users)

        def generate_fake_nft_name():
            # Combine random words to create a fake NFT name
            return f"{fake.color_name()} {fake.word()} {fake.random_int(1, 1000)}"

        def generate_list_of_nft_names(n):
            return [generate_fake_nft_name() for _ in range(n)]

        nft_names = generate_list_of_nft_names(len(nfts))
        fake_nft_ids = [fake.uuid4().replace("-", "")[:10] for _ in range(len(nfts))]
        nft_marketplaces = np.random.choice(marketplaces, size=len(nfts), replace=True)
        nft_usernames_idx = np.random.choice(range(len(usernames)), size=len(nfts), replace=True)
        starting_day = fake.date_time_this_year() + timedelta(minutes=0, seconds=0)

        idx_loss = [idx for idx, nft in enumerate(nfts) if nft['loss'] in ('high', 'low')]
        idx_nft_claim = np.random.choice(idx_loss, size=number_nft_compensation_claims, replace=True)

        idx_no_loss = [idx for idx, nft in enumerate(nfts) if nft['loss'] == 'no']
        idx_nft_exchange = np.random.choice(idx_no_loss, size=number_nft_coin_exchange, replace=True)

        idx_loss_high = [idx for idx, nft in enumerate(nfts) if nft['loss'] == 'high']
        idx_nft_high_loss_coin_ack = np.random.choice(idx_loss_high, size=number_nft_claim_high_loss_ack, replace=True)

        events = []
        for idx, nft in enumerate(nfts):
            nft_name = nft_names[idx]
            market_place = nft_marketplaces[nft_usernames_idx[idx]]
            wallet_id = fake_metamask_ids[nft_usernames_idx[idx]]
            username = usernames[nft_usernames_idx[idx]]
            event = {
                'Date': starting_day + timedelta(days=int(nft['mint_day']),
                                                 minutes=int(np.random.randint(0, 59)),
                                                 seconds=int(np.random.randint(0, 59))),
                'NFT id': fake_nft_ids[idx],
                'NFT price': nft['price'][0],
                'NFT name': nft_name,
                'Username': username,
                'Action': 'mint',
                'Marketplace': 'bitsi',
                'Wallet id': wallet_id
            }
            events.append(event)
            if nft['loss'] == 'low' or nft['loss'] == 'high':
                min_index = np.argmin(nft['price'])
                event = {
                    'Date': starting_day + timedelta(days=int(nft['mint_day'] + min_index),
                                                     minutes=int(np.random.randint(0, 59)),
                                                     seconds=int(np.random.randint(0, 59))),
                    'NFT id': fake_nft_ids[idx],
                    'NFT price': nft['price'][min_index],
                    'NFT name': nft_name,
                    'Username': username,
                    'Action': 'sale',
                    'Marketplace': market_place,
                    'Wallet id': wallet_id
                }
            events.append(event)
            if idx in idx_nft_claim:
                claim_index = min(np.argmin(nft['price']) + 1, len(nft['price'])-1)
                event = {
                    'Date': starting_day + timedelta(days=int(nft['mint_day'] + claim_index),
                                                     minutes=int(np.random.randint(0, 59)),
                                                     seconds=int(np.random.randint(0, 59))),
                    'NFT id': fake_nft_ids[idx],
                    'NFT price': nft['price'][claim_index],
                    'NFT name': nft_name,
                    'Username': username,
                    'Action': 'claim',
                    'Marketplace': market_place,
                    'Wallet id': wallet_id
                }
            events.append(event)
            if idx in idx_nft_exchange:
                exchange_day = np.random.choice(range(len(nft['price'])), size=1, replace=True)
                event = {
                    'Date': starting_day + timedelta(days=int(nft['mint_day'] + exchange_day[0]),
                                                     minutes=int(np.random.randint(0, 59)),
                                                     seconds=int(np.random.randint(0, 59))),
                    'NFT id': fake_nft_ids[idx],
                    'NFT price': nft['price'][exchange_day[0]],
                    'NFT name': nft_name,
                    'Username': username,
                    'Action': 'exchange',
                    'Marketplace': market_place,
                    'Wallet id': wallet_id
                }
            events.append(event)
            if idx in idx_nft_high_loss_coin_ack:
                min_index = np.argmin(nft['price'])
                ack_day = np.random.choice(range(min_index, len(nft['price'])), size=1, replace=True)
                event = {
                    'Date': starting_day + timedelta(days=int(nft['mint_day'] + ack_day[0]),
                                                     minutes=int(np.random.randint(0, 59)),
                                                     seconds=int(np.random.randint(0, 59))),
                    'NFT id': fake_nft_ids[idx],
                    'NFT price': nft['price'][ack_day[0]],
                    'NFT name': nft_name,
                    'Username': username,
                    'Action': 'high_loss_full_compensation',
                    'Marketplace': market_place,
                    'Wallet id': wallet_id
                }
            events.append(event)
        # Sort the events list by date
        sorted_events = sorted(events, key=lambda event: event['Date'])

        self.events = sorted_events
        return

    def save_events(self):
        events = self.events

        # Specify the field names for the CSV header
        fieldnames = ['Date',
                      'NFT id',
                      'NFT price',
                      'NFT name',
                      'Username',
                      'Action',
                      'Marketplace',
                      'Wallet id']

        # Specify the filename for the CSV file
        filename = 'NFT events.csv'

        # Write events to CSV
        with open(filename, 'w', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            # Write header
            writer.writeheader()

            # Write data rows
            for event in events:
                writer.writerow(event)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    nft_sim = SimNFT('config.ini')

    nft_sim.gen_NFTs()

    nft_sim.gen_loss()

    nft_sim.gen_events()

    nft_sim.save_events()
